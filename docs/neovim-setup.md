# GPC Language Server - Neovim Setup

This guide explains how to use the GPC Language Server with Neovim.

## Prerequisites

- Neovim 0.8+ (with built-in LSP support)
- Node.js 18+
- [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) plugin

## Installation

### 1. Build the Language Server

```bash
# Clone and build
git clone https://github.com/zkiwiko/gpc-vscode.git
cd gpc-vscode
npm install
npm run compile
```

The server will be at `dist/server.js`.

### 2. Configure Neovim

Add to your Neovim config (`~/.config/nvim/init.lua` or `~/.config/nvim/lua/plugins/gpc.lua`):

```lua
-- Register GPC filetype
vim.filetype.add({
  extension = {
    gpc = 'gpc',
  },
})

-- Set commentstring for GPC files
vim.api.nvim_create_autocmd("FileType", {
  pattern = "gpc",
  callback = function()
    vim.bo.commentstring = "// %s"
  end,
})

-- Configure LSP
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

-- Check if gpc config already exists
if not configs.gpc then
  configs.gpc = {
    default_config = {
      cmd = { 'node', '/path/to/gpc-vscode/dist/server.js', '--stdio' },
      filetypes = { 'gpc' },
      root_dir = function(fname)
        return lspconfig.util.root_pattern('.git', 'main.gpc')(fname)
          or lspconfig.util.path.dirname(fname)
      end,
      single_file_support = true,
      settings = {},
    },
  }
end

-- Enable the server
lspconfig.gpc.setup({
  on_attach = function(client, bufnr)
    -- Optional: Add keybindings
    local opts = { noremap = true, silent = true, buffer = bufnr }
    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
    vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
    vim.keymap.set('n', 'gr', vim.lsp.buf.references, opts)
    vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, opts)
    vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, opts)
    vim.keymap.set('n', '[d', vim.diagnostic.goto_prev, opts)
    vim.keymap.set('n', ']d', vim.diagnostic.goto_next, opts)
  end,
})
```

**Important:** Replace `/path/to/gpc-vscode` with the actual path where you cloned the repository.

### 3. Add Syntax Highlighting (Optional)

Create `~/.config/nvim/syntax/gpc.vim`:

```vim
" GPC Syntax Highlighting for Neovim

if exists("b:current_syntax")
  finish
endif

" Keywords
syn keyword gpcKeyword if else while for function return break continue
syn keyword gpcKeyword switch case default do combo init main enum
syn keyword gpcKeyword define const use

" Types
syn keyword gpcType int int8 int16 int32 uint8 uint16 uint32 string data image

" Boolean
syn keyword gpcBoolean TRUE FALSE

" Comments
syn match gpcComment "//.*$"
syn region gpcComment start="/\*" end="\*/"

" Strings
syn region gpcString start='"' end='"'
syn region gpcString start="'" end="'"

" Numbers
syn match gpcNumber "\<\d\+\>"
syn match gpcNumber "\<0x[0-9a-fA-F]\+\>"

" Include
syn match gpcInclude "^\s*#include\s*[<\"].*[>\"]"

" Functions (user-defined)
syn match gpcFunction "\<\w\+\s*("me=e-1

" Highlighting
hi def link gpcKeyword Keyword
hi def link gpcType Type
hi def link gpcBoolean Boolean
hi def link gpcComment Comment
hi def link gpcString String
hi def link gpcNumber Number
hi def link gpcInclude Include
hi def link gpcFunction Function

let b:current_syntax = "gpc"
```

## Features Available

| Feature | Status | Notes |
|---------|--------|-------|
| Syntax Errors | ✅ | Real-time diagnostics |
| Semantic Errors | ✅ | Undefined variables, type errors |
| Go to Definition | ✅ | Works across `#include` files |
| Find References | ✅ | Works across `#include` files |
| Hover Documentation | ✅ | Shows function signatures |
| Code Completion | ✅ | Keywords, functions, variables |
| Signature Help | ✅ | Parameter hints |
| Code Actions | ✅ | Quick fixes, "Did you mean?" |
| Document Symbols | ✅ | Outline view |
| Inlay Hints | ✅ | Requires Neovim 0.10+ |

## Verifying the Setup

1. Open a `.gpc` file
2. Run `:LspInfo` to check if the server is attached
3. Try hovering over a function (`K`) or going to definition (`gd`)

## Troubleshooting

### Server Not Starting

Check the server runs manually:
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"capabilities":{}}}' | \
  node /path/to/gpc-vscode/dist/server.js --stdio
```

### No Diagnostics

Ensure the file has `.gpc` extension and filetype is set:
```vim
:set filetype?
" Should show: filetype=gpc
```

### Check LSP Logs

```vim
:lua vim.lsp.set_log_level("debug")
:LspLog
```

## Alternative: Use with coc.nvim

If you prefer [coc.nvim](https://github.com/neoclide/coc.nvim), add to `coc-settings.json`:

```json
{
  "languageserver": {
    "gpc": {
      "command": "node",
      "args": ["/path/to/gpc-vscode/dist/server.js", "--stdio"],
      "filetypes": ["gpc"],
      "rootPatterns": [".git", "main.gpc"]
    }
  }
}
```

## Alternative: Use with vim-lsp

If you use [vim-lsp](https://github.com/prabirshrestha/vim-lsp):

```vim
if executable('node')
  au User lsp_setup call lsp#register_server({
    \ 'name': 'gpc',
    \ 'cmd': {server_info->['node', '/path/to/gpc-vscode/dist/server.js', '--stdio']},
    \ 'allowlist': ['gpc'],
    \ })
endif
```

## NPM Global Install (Alternative)

You can also install globally for easier access:

```bash
cd /path/to/gpc-vscode
npm link
```

Then use in config:
```lua
cmd = { 'gpc-language-server', '--stdio' },
```

*(Note: This requires adding a bin entry to package.json)*
