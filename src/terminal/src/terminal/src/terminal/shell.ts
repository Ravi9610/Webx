import { Terminal } from '@xterm/xterm'
import { executeCommand } from './commands'
import { getFileSystem } from '@/filesystem/virtualFs'

export class FileSystemShell {
  private terminal: Terminal
  private currentPath: string = '/'
  private isRunning: boolean = true

  constructor(terminal: Terminal) {
    this.terminal = terminal
  }

  async start() {
    this.terminal.writeln('WebOS Terminal v1.0')
    this.terminal.writeln('Type "help" for available commands.\n')
    this.prompt()
    this.terminal.onData(this.handleInput.bind(this))
  }

  stop() {
    this.isRunning = false
  }

  private async handleInput(data: string) {
    if (!this.isRunning) return

    // Handle special keys
    if (data === '\r') { // Enter
      const line = this.getCurrentLine()
      this.terminal.writeln('')
      await this.processCommand(line)
      this.prompt()
    } else if (data === '\x7f') { // Backspace
      if (this.terminal.buffer.active.cursorX > 2) {
        this.terminal.write('\b \b')
      }
    } else if (data === '\x03') { // Ctrl+C
      this.terminal.writeln('^C')
      this.prompt()
    } else {
      this.terminal.write(data)
    }
  }

  private getCurrentLine(): string {
    // Get the current line content from the terminal
    // Simplified - actual implementation would need to track input buffer
    return ''
  }

  private async processCommand(line: string) {
    const result = await executeCommand(line, this.currentPath)
    
    if (result === '__CLEAR__') {
      this.terminal.clear()
    } else if (result.startsWith('__CD__')) {
      this.currentPath = result.substring(6)
    } else if (result) {
      this.terminal.writeln(result)
    }
  }

  private prompt() {
    this.terminal.write(`\r\n${this.currentPath}> `)
  }
}
