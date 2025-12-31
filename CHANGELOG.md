# Changelog

## [1.5.1] - 2025-12-31

### ✨ Features
- **Enhanced CLI Structure**: Introduced command-based interface with aliases:
  - `list` / `ls` - List all stored code snippets files
  - `preview` / `pv` - Preview all VSCode code snippets
- **Prefix Display**: Preview command now shows snippet prefix for easy reference
- **Better Error Handling**: Improved error messages when no snippets found

### 🛑 Deprecations
- `-L` / `--list` option is deprecated. Use `csnp list` or `csnp ls` command instead
- `-P` / `--preview` option is deprecated. Use `csnp preview` or `csnp pv` command instead
  - Old usage still works but will show a deprecation warning

### 🛠 Improvements
- **UX Enhancement**: Changed "no snippets found" from info to error level
- **Code Quality**: Added null checks for better error handling in list, preview, and pull commands

## [1.5.0] - 2025-12-29

### 🚀 Features
- **Global Scope Support**: `list` (-L) and `preview` (-P) commands now support `-G` flag to view global snippets (VSCode User Snippets).
- **New Preview UI**: Redesigned snippet preview with a modern Card layout for better readability.
- **CLI Standardization**: Standardized short flags to uppercase:
  - `-L` for List
  - `-P` for Preview
  - `-G` for Global
  - `-H` for Help
  - `-V` for Version

### 🛠 Improvements
- **Modern Build Stack**: Migrated from Rollup to **tsup** for faster and more reliable builds.
- **Dependencies**: Replaced heavier dependencies with modern alternatives.
- **Testing**: Migrated from Jest to **Vitest** and increased test coverage.
- **Performance**: Significantly reduced bundle size.

### 🐛 Fixes
- Fixed terminal flickering issues during interactive prompts.
- Fixed `dynamic require` issues in ESM builds.
