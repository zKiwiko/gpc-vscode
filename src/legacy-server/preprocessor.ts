import * as fs from "fs";
import * as path from "path";
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";

const fsPromises = fs.promises;

/**
 * Maps a line in processed content back to its original source location
 */
export interface SourceMapping {
  /** Line number in processed content (0-indexed) */
  processedLine: number;
  /** Path to the original file */
  originalFile: string;
  /** Line number in original file (0-indexed) */
  originalLine: number;
}

/**
 * Result of preprocessing a GPC file
 */
export interface PreprocessResult {
  /** Fully processed content with all includes expanded */
  content: string;
  /** Source mappings for each line */
  sourceMap: SourceMapping[];
  /** Errors encountered during preprocessing (file not found, circular includes) */
  errors: Diagnostic[];
  /** List of all successfully included file paths */
  includedFiles: string[];
}

// Support both quotes ("file" or 'file') and angle brackets (<file>)
const INCLUDE_REGEX = /^(\s*)#include\s+(?:["']([^"']+)["']|<([^>]+)>)\s*$/;
const MAX_INCLUDE_DEPTH = 10;

/**
 * Preprocessor for GPC files that handles #include directives
 */
export class Preprocessor {
  /**
   * Process a GPC file and expand all #include directives
   * @param content The file content to process
   * @param baseDir The directory to resolve relative includes from
   * @param filePath The path of the file being processed (for source mapping)
   * @returns PreprocessResult with expanded content, source map, and any errors
   */
  public static async process(
    content: string,
    baseDir: string,
    filePath: string = "main"
  ): Promise<PreprocessResult> {
    const includeStack = new Set<string>(); // Files currently being processed (for circular detection)
    const alreadyIncluded = new Set<string>(); // Files already fully processed (skip on re-include)
    const includedFiles: string[] = []; // Track all successfully included files
    const mainPath = path.resolve(baseDir, filePath);
    includeStack.add(mainPath);
    const result = await this.processInternal(content, baseDir, filePath, includeStack, alreadyIncluded, includedFiles, 0);
    alreadyIncluded.add(mainPath);
    return { ...result, includedFiles };
  }

  private static async processInternal(
    content: string,
    baseDir: string,
    filePath: string,
    includeStack: Set<string>,
    alreadyIncluded: Set<string>,
    includedFiles: string[],
    depth: number
  ): Promise<Omit<PreprocessResult, 'includedFiles'>> {
    const lines = content.split("\n");
    const resultLines: string[] = [];
    const sourceMap: SourceMapping[] = [];
    const errors: Diagnostic[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(INCLUDE_REGEX);

      if (match) {
        // match[2] is path from quotes, match[3] is path from angle brackets
        const includePath = match[2] || match[3];
        const resolvedPath = path.resolve(baseDir, includePath);

        // Check for max depth
        if (depth >= MAX_INCLUDE_DEPTH) {
          errors.push({
            severity: DiagnosticSeverity.Error,
            range: {
              start: { line: i, character: 0 },
              end: { line: i, character: line.length },
            },
            message: `Include depth exceeds maximum of ${MAX_INCLUDE_DEPTH}`,
            source: "GPC Preprocessor",
          });
          // Keep the include line as-is but commented
          resultLines.push(`// [max depth] ${line}`);
          sourceMap.push({
            processedLine: resultLines.length - 1,
            originalFile: filePath,
            originalLine: i,
          });
          continue;
        }

        // Check if already included (skip silently - like #pragma once)
        if (alreadyIncluded.has(resolvedPath)) {
          // File was already fully processed, skip it without error
          resultLines.push(`// [already included] ${line}`);
          sourceMap.push({
            processedLine: resultLines.length - 1,
            originalFile: filePath,
            originalLine: i,
          });
          continue;
        }

        // Check for circular includes (file is currently being processed)
        // Skip silently since the builder only includes unique file paths
        if (includeStack.has(resolvedPath)) {
          resultLines.push(`// [circular] ${line}`);
          sourceMap.push({
            processedLine: resultLines.length - 1,
            originalFile: filePath,
            originalLine: i,
          });
          continue;
        }

        // Try to read the included file
        try {
          // Check if file exists using async access
          try {
            await fsPromises.access(resolvedPath, fs.constants.R_OK);
          } catch {
            errors.push({
              severity: DiagnosticSeverity.Error,
              range: {
                start: { line: i, character: 0 },
                end: { line: i, character: line.length },
              },
              message: `Include file not found: ${resolvedPath}`,
              source: "GPC Preprocessor",
            });
            // Keep the include line as-is but commented
            resultLines.push(`// [not found] ${line}`);
            sourceMap.push({
              processedLine: resultLines.length - 1,
              originalFile: filePath,
              originalLine: i,
            });
            continue;
          }

          const includeContent = await fsPromises.readFile(resolvedPath, "utf-8");
          const includeDir = path.dirname(resolvedPath);

          // Mark as being processed (for circular detection)
          includeStack.add(resolvedPath);

          // Process the included file recursively
          const includeResult = await this.processInternal(
            includeContent,
            includeDir,
            resolvedPath,
            includeStack,
            alreadyIncluded,
            includedFiles,
            depth + 1
          );

          // Mark as fully processed and remove from stack
          includeStack.delete(resolvedPath);
          alreadyIncluded.add(resolvedPath);
          includedFiles.push(resolvedPath);

          // Add a marker comment for the start of the include
          resultLines.push(`// [begin include: ${includePath}]`);
          sourceMap.push({
            processedLine: resultLines.length - 1,
            originalFile: filePath,
            originalLine: i,
          });

          // Add the processed include content
          const includeLines = includeResult.content.split("\n");
          for (let j = 0; j < includeLines.length; j++) {
            resultLines.push(includeLines[j]);
            // Find the source mapping for this line
            const mapping = includeResult.sourceMap.find(
              (m) => m.processedLine === j
            );
            if (mapping) {
              sourceMap.push({
                processedLine: resultLines.length - 1,
                originalFile: mapping.originalFile,
                originalLine: mapping.originalLine,
              });
            } else {
              // Fallback - shouldn't happen but just in case
              sourceMap.push({
                processedLine: resultLines.length - 1,
                originalFile: resolvedPath,
                originalLine: j,
              });
            }
          }

          // Add a marker comment for the end of the include
          resultLines.push(`// [end include: ${includePath}]`);
          sourceMap.push({
            processedLine: resultLines.length - 1,
            originalFile: filePath,
            originalLine: i,
          });

          // Collect errors from the included file, adjusting their line positions
          // These errors are already in original file coordinates, so just add them
          errors.push(...includeResult.errors);
        } catch (err) {
          errors.push({
            severity: DiagnosticSeverity.Error,
            range: {
              start: { line: i, character: 0 },
              end: { line: i, character: line.length },
            },
            message: `Error reading include file: ${resolvedPath} - ${err}`,
            source: "GPC Preprocessor",
          });
          resultLines.push(`// [error] ${line}`);
          sourceMap.push({
            processedLine: resultLines.length - 1,
            originalFile: filePath,
            originalLine: i,
          });
        }
      } else {
        // Regular line - just copy it
        resultLines.push(line);
        sourceMap.push({
          processedLine: resultLines.length - 1,
          originalFile: filePath,
          originalLine: i,
        });
      }
    }

    return {
      content: resultLines.join("\n"),
      sourceMap,
      errors,
    };
  }

  /**
   * Map a diagnostic from processed content coordinates to original file coordinates
   * @param diagnostic The diagnostic with processed content line numbers
   * @param sourceMap The source map from preprocessing
   * @param mainFile The main file path (for diagnostics in the main file)
   * @returns The diagnostic with original file coordinates, or null if from included file
   */
  public static mapDiagnostic(
    diagnostic: Diagnostic,
    sourceMap: SourceMapping[],
    mainFile: string
  ): { diagnostic: Diagnostic; file: string } | null {
    const startLine = diagnostic.range.start.line;
    const endLine = diagnostic.range.end.line;

    // Find the source mapping for the start line
    const startMapping = sourceMap.find((m) => m.processedLine === startLine);
    const endMapping = sourceMap.find((m) => m.processedLine === endLine);

    if (!startMapping) {
      // No mapping found, return as-is for main file
      return { diagnostic, file: mainFile };
    }

    // Create a new diagnostic with mapped positions
    const mappedDiagnostic: Diagnostic = {
      ...diagnostic,
      range: {
        start: {
          line: startMapping.originalLine,
          character: diagnostic.range.start.character,
        },
        end: {
          line: endMapping ? endMapping.originalLine : startMapping.originalLine,
          character: diagnostic.range.end.character,
        },
      },
    };

    return {
      diagnostic: mappedDiagnostic,
      file: startMapping.originalFile,
    };
  }

  /**
   * Map a position from original file coordinates to processed content coordinates
   * Used for features like hover, completion that receive positions from the editor
   * @param line Line number in the original file (0-indexed)
   * @param sourceMap The source map from preprocessing
   * @param filePath The path of the original file
   * @returns The line number in processed content, or -1 if not found
   */
  public static mapPositionToProcessed(
    line: number,
    sourceMap: SourceMapping[],
    filePath: string
  ): number {
    const mapping = sourceMap.find(
      (m) => m.originalFile === filePath && m.originalLine === line
    );
    return mapping ? mapping.processedLine : line;
  }
}
