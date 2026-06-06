# WebOS - Windows 11 Style Operating System

A production-grade web-based operating system built with React, TypeScript, TailwindCSS, and Vite.

## Features

- 🖥️ **Windows 11 Style Interface** - Modern UI with blur effects, rounded corners, and acrylic materials
- 📁 **File Manager** - Full file system with IndexedDB persistence
- 🖥️ **Terminal** - xterm.js powered terminal with custom commands
- 📦 **Installable Apps** - App store with one-click installation
- 🎯 **Window Management** - Draggable, resizable windows with snap layouts
- 🚀 **Process Manager** - Track and manage running applications
- 💾 **Persistent Storage** - IndexedDB for files and settings

## Tech Stack

- React 18 + TypeScript
- TailwindCSS for styling
- Zustand for state management
- IndexedDB (idb) for persistence
- xterm.js for terminal
- Vite for build tooling

## Getting Started

### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

### Building

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Project Structure

```

webos/
├── src/
│   ├── kernel/      # Core OS kernel
│   ├── desktop/     # Desktop UI components
│   ├── windows/     # Window management
│   ├── filesystem/  # Virtual file system
│   ├── apps/        # Built-in and installable apps
│   └── store/       # Zustand stores

```

## Apps Included

- File Explorer
- Web Browser
- Settings
- App Store
- Notes
- Calculator
- Paint
- Media Player
- Calendar
- AI Assistant

## License

MIT
