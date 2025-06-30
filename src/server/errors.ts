import { Diagnostic } from "vscode-languageserver";
import { Parser } from "./parser/parser";

export class ErrorCollector {
  public static collectErrors(input: string): Diagnostic[] {
    return Parser.getErrors(input);
  }
}
