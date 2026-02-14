import { Diagnostic } from "vscode-languageserver";
import { Parser } from "./parser/parser";
import { GlobalSymbols } from "./parser/visitor";

export class ErrorCollector {
  public static collectErrors(input: string, globalSymbols?: GlobalSymbols): Diagnostic[] {
    return Parser.getErrors(input, globalSymbols);
  }
}
