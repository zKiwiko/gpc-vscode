# Changelog

## [1.2.0] - 2026-01-25
### Added
- **`#include` directive support** for modular code organization
  - Syntax: `#include "filename.gpc"` or `#include 'filename.gpc'`
  - Paths are resolved relative to the current file
  - Recursive includes supported (max depth: 10)
  - Circular include detection with error reporting
- **Cross-file language features**:
  - Auto-completion now includes symbols from included files
  - Hover shows information for symbols from includes (with source file indicator)
  - Go to Definition jumps to the correct file and line in included files
  - Signature help works for functions defined in included files
  - Diagnostics are correctly mapped back to original file locations

### Internal
- Added `Preprocessor` module for include resolution and source mapping
- Updated `LanguageFeatures` with include-aware methods
- Added preprocess caching for improved performance

## [1.1.2] - 2025-10-15
- Fixed inconsistencies with hover info descriptions.
- Fixed a couple data errors. [#0001](https://github.com/zKiwiko/gpc-vscode/issues/1) [#0002](https://github.com/zKiwiko/gpc-vscode/issues/2)

## [1.1.1] - 2025-07-11
### Changed
- Properly Updated parameters/description for the `image_oled` function.

## [1.1.0] - 2025-07-11
### Added
- Variable name resolving: e.g., `function(var)` now raises an error if `var` doesn't exist.
- Command to open GPC language documentation: `GPC: Open Documentation`
- Code Snippets

### Changed
- All-caps `enum` member warning is now a hint.
- ~~Updated parameters for the `image_oled` function.~~
- Semicolons (`;`) at the end of `enum` blocks now raise an error.

### Fixed
- `combo` names are now included in autocomplete.
- declaring a function with the same name as a built-in function or constant not raising an error.
- `document/onDidClose` message now sends correctly.
    - This resets Diagnostics when you close a file.
- `document/onDidOpen` message now sends correctly.
    - This resets Diagnostics when you open a file.

### Internal
- Cleaned up unused files

## [1.0.0] - 2025-07-03
- Initial release. See README for details.