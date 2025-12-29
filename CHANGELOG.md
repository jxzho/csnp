# Changelog

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
