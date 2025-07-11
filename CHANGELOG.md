# Changelog

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