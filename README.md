# GPC Language Support for VS Code

This extension provides support for the [GPC Scripting Language](https://guide.cronus.support), designed
for the Cronus Zen.

This extension manages [Ersa](https://github.com/zkiwiko/ersa) for its features and LSP.
It is recommended to use the [Ersa LSP](https://github.com/zkiwiko/ersa-lsp-core) as its up to date, better
implementations of LSP features, better preformance, and the extension manages it automatically, keeping
them updated and leveraging their features and commands.
If you'd prefer, you can always use the legacy LSP implementation.

## Commands

**General Commands:**

- `GPC: Restart LSP` - Restart the current LSP process.
- `GPC: Open Documentation` - Open specific parts of the GPC documentation in a browser.
- `GPC: Toggle Experimental Features` - Allows you to disable to enable experimental LSP features.

**Build Commands:**

- `GPC: Ersa Build Current File` - Builds the currently open file by running `ersa build --file <current file> --output build/build.gpc`
- `GPC: Ersa Build 'Main' File` - Builds the file specified in `gpc.ersa.main` workspace setting by running `ersa build --file <gpc.ersa.main file> --output build/build.gpc`

To use the build main command, set the `gpc.ersa.main` path in your workspace settings. If not configured, you'll be prompted to add it when running the command.

## Legacy LSP

If youd like to use the legacy LSP intead of Ersa's deticated LSP, you can enable it in the extensions settings.
The legacy LSP will not be updated past extension version `1.3.0` so itd highly recommended to use Ersa's LSP.

The legacy LSP contains all previous features such as

- Code Diagnostics
- Auto Complete
- Snippets
- C++ Style file importing

But suffers from inconsistent error messages due to its ANTLR4 generated parser.
