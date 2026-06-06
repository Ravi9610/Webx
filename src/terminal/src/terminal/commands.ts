import { getFileSystem, createDirectory, deleteNode, renameNode, moveNode } from '@/filesystem/virtualFs'

export interface Command {
  name: string
  description: string
  usage: string
  execute: (args: string[], currentPath: string) => Promise<string>
}

export const commands: Map<string, Command> = new Map()

// ls command
commands.set('ls', {
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [path]',
  execute: async (args, currentPath) => {
    const targetPath = args[0] || currentPath
    const fs = await getFileSystem()
    const entries = Array.from(fs.values()).filter(f => f.parentId === getNodeIdByPath(targetPath))
    if (entries.length === 0) return 'Directory is empty'
    return entries.map(e => `${e.type === 'directory' ? '📁' : '📄'} ${e.name}`).join('\n')
  },
})

// cd command
commands.set('cd', {
  name: 'cd',
  description: 'Change directory',
  usage: 'cd <path>',
  execute: async (args, currentPath) => {
    if (!args[0]) return currentPath
    // For now, just return new path
    const newPath = args[0] === '..' ? currentPath.split('/').slice(0, -1).join('/') || '/' : 
                    args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`
    return `__CD__${newPath}`
  },
})

// mkdir command
commands.set('mkdir', {
  name: 'mkdir',
  description: 'Create directory',
  usage: 'mkdir <name>',
  execute: async (args, currentPath) => {
    if (!args[0]) return 'Error: missing directory name'
    await createDirectory(args[0], currentPath)
    return `Directory created: ${args[0]}`
  },
})

// touch command
commands.set('touch', {
  name: 'touch',
  description: 'Create empty file',
  usage: 'touch <filename>',
  execute: async (args, currentPath) => {
    if (!args[0]) return 'Error: missing file name'
    const fs = await getFileSystem()
    const filePath = `${currentPath}/${args[0]}`
    if (fs.has(filePath)) {
      return `File already exists: ${args[0]}`
    }
    // createFile would go here
    return `File created: ${args[0]}`
  },
})

// rm command
commands.set('rm', {
  name: 'rm',
  description: 'Remove file or directory',
  usage: 'rm <path>',
  execute: async (args, currentPath) => {
    if (!args[0]) return 'Error: missing path'
    const targetPath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`
    await deleteNode(targetPath)
    return `Removed: ${args[0]}`
  },
})

// pwd command
commands.set('pwd', {
  name: 'pwd',
  description: 'Print working directory',
  usage: 'pwd',
  execute: async (_, currentPath) => currentPath,
})

// help command
commands.set('help', {
  name: 'help',
  description: 'Show available commands',
  usage: 'help [command]',
  execute: async (args) => {
    if (args[0]) {
      const cmd = commands.get(args[0])
      if (cmd) {
        return `${cmd.name} - ${cmd.description}\nUsage: ${cmd.usage}`
      }
      return `Unknown command: ${args[0]}`
    }
    const cmdList = Array.from(commands.values())
    return cmdList.map(cmd => `${cmd.name.padEnd(10)} - ${cmd.description}`).join('\n')
  },
})

// echo command
commands.set('echo', {
  name: 'echo',
  description: 'Print text',
  usage: 'echo <text>',
  execute: async (args) => args.join(' '),
})

// clear command
commands.set('clear', {
  name: 'clear',
  description: 'Clear terminal',
  usage: 'clear',
  execute: async () => '__CLEAR__',
})

export async function executeCommand(commandLine: string, currentPath: string): Promise<string> {
  const args = commandLine.trim().split(/\s+/)
  const cmdName = args[0].toLowerCase()
  const cmdArgs = args.slice(1)

  const command = commands.get(cmdName)
  if (!command) {
    return `Command not found: ${cmdName}. Type 'help' for available commands.`
  }

  try {
    return await command.execute(cmdArgs, currentPath)
  } catch (error: any) {
    return `Error: ${error.message}`
  }
}

function getNodeIdByPath(path: string): string | null {
  // Simplified - would need to look up from file system
  return null
}
