# GPC Language Support for VS Code

A comprehensive Visual Studio Code extension for the Cronus Zen's GPC Scripting language, providing rich language features including syntax highlighting, intelligent code completion, error detection, and advanced code navigation.

## Known Issues
- Weird syntax error messages (blame ANTLR4)

## Features

### 🎨 Syntax Highlighting
- **Rich syntax coloring**
- **Keyword highlighting**
- **Data type highlighting**
- **String and comment highlighting**
- **Number highlighting**
- **Boolean highlighting**

### 🧠 IntelliSense & Code Completion
- **Smart auto-completion** for keywords, data types, and identifiers
- **Built-in function completion** with parameter signatures and descriptions
- **User-defined function completion** with parameter hints
- **Variable and constant completion** with context awareness
- **Snippet support** with parameter placeholders for functions

### 📖 Documentation & Help
- **Hover information** showing detailed documentation for:
  - Built-in functions with descriptions and parameter info
  - User-defined functions with signatures
  - Variables and constants with type information
- **Signature help** displaying parameter information while typing function calls
- **Parameter counting** and active parameter highlighting

### 🔍 Code Navigation
- **Go to Definition** - Navigate to function and variable declarations
- **Find All References** - Locate all usages of symbols throughout your code
- **Document Symbols** - Outline view showing:
  - Functions with parameter lists
  - Variables and constants
  - Hierarchical symbol organization

### 🎯 Inlay Hints (Configurable)
- **Parameter name hints** displayed inline for better code readability
- **Function call annotations** showing parameter names
- **Toggleable settings** for users who prefer cleaner code view
- **Real-time updates** when configuration changes

### 🚨 Error Detection & Diagnostics
- **Real-time syntax error detection** as you type
- **Semantic analysis** with two-pass compilation:
  - First pass: Collect all declarations (functions, variables, enums, arrays)
  - Second pass: Validate references and semantic correctness
- **Forward reference support** - Use functions before they're defined
- **Comprehensive error messages** with precise location information
- **Warning system** for unused variables and other code quality issues

### 📝 Advanced Language Features
- **Intelligent parsing** using ANTLR4 grammar
- **Caching system** for improved performance
- **Built-in language constants** recognition
- **Function validation** with parameter count checking

### ⚙️ Configuration Options

The extension provides several customizable settings:

#### Inlay Hints Settings
- **`gpc.inlayHints.enabled`** (boolean, default: `true`)
  - Master toggle for all inlay hints
  - Disable to hide all inline annotations

- **`gpc.inlayHints.parameterNames`** (boolean, default: `true`)
  - Show parameter names in function calls
  - Example: `get_val(input: XB1_LT)` instead of `get_val(XB1_LT)`

## Installation

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "GPC Language Tools"
4. Click Install

## Usage

### Basic Usage
1. Open any `.gpc` file
2. Enjoy automatic syntax highlighting and language features
3. Start typing to see intelligent code completion
4. Hover over functions and variables for documentation

### Code Completion
- Type function names and see auto-completion with parameter hints
- Use built-in snippets for common patterns
- Navigate through parameters using `Tab`

### Error Detection
- Syntax errors are highlighted in red with squiggly underlines
- Semantic errors show detailed error messages
- Warnings appear for code quality issues

### Navigation
- `F12` or `Ctrl + Click` - Go to Definition
- `Shift + F12` - Find All References
- `Ctrl + Shift + O` - Go to Symbol in File

## Configuration

### VS Code Settings UI
1. Open Settings (`Ctrl + ,`)
2. Search for "gpc"
3. Adjust the available options

### settings.json Configuration
```json
{
  "gpc.inlayHints.enabled": true,
  "gpc.inlayHints.parameterNames": true
}
```

### Workspace-specific Settings
Create `.vscode/settings.json` in your project root:
```json
{
  "gpc.inlayHints.enabled": false
}
```

## GPC Language Support

This extension supports the complete GPC language specification including:

## Development

### Architecture
- **Language Server Protocol (LSP)** implementation for robust language support
- **ANTLR4 grammar** for precise parsing
- **Two-pass semantic analysis** for forward reference support
- **Caching system** for optimal performance
- **Modular design** with separate parsing, completion, and feature modules

## Contributing

Contributions and suggestions are welcome.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE.md](LICENSE.md) file for details.

### What this means:
- ✅ **Free to use** - Use this extension for any purpose
- ✅ **Free to modify** - Change the code to suit your needs
- ✅ **Free to distribute** - Share the extension and your modifications
- ⚠️ **Copyleft** - If you distribute modified versions, they must also be GPL-3.0 licensed
- ⚠️ **No warranty** - Provided "as-is" without warranty of any kind

Copyright (C) 2025 zkiwiko

## Changelog

### Latest Features
- ✅ Full syntax highlighting
- ✅ IntelliSense with built-in function support
- ✅ Real-time error detection
- ✅ Hover documentation
- ✅ Go to definition and find references
- ✅ Configurable inlay hints
- ✅ Document symbols and outline view
- ✅ Signature help for function calls
- ✅ Forward reference support
- ✅ Comprehensive built-in function library
