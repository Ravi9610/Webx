import React, { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { executeCommand } from './commands'
import { FileSystemShell } from './shell'

interface TerminalAppProps {
  windowId: string
}

const TerminalApp: React.FC<TerminalAppProps> = ({ windowId }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminal = useRef<Terminal | null>(null)
  const fitAddon = useRef<FitAddon | null>(null)
  const shell = useRef<FileSystemShell | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    terminal.current = new Terminal({
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
      },
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      cursorBlink: true,
    })

    fitAddon.current = new FitAddon()
    terminal.current.loadAddon(fitAddon.current)
    terminal.current.open(terminalRef.current)
    fitAddon.current.fit()

    shell.current = new FileSystemShell(terminal.current)
    shell.current.start()

    const handleResize = () => {
      fitAddon.current?.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      shell.current?.stop()
      terminal.current?.dispose()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fitAddon.current?.fit(), 100)
    return () => clearTimeout(timer)
  }, [])

  return <div ref={terminalRef} className="w-full h-full" />
}

export default TerminalApp
