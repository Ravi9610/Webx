import { create } from 'zustand'
import { FileEntry } from '@/types/file'
import { getFileSystem, createDirectory, createFile, deleteNode, renameNode, moveNode } from '@/filesystem/virtualFs'

interface FileStore {
  files: FileEntry[]
  currentPath: string
  loading: boolean
  initializeFiles: () => Promise<void>
  loadDirectory: (path: string) => Promise<void>
  createFolder: (name: string, parentPath: string) => Promise<void>
  createNewFile: (name: string, parentPath: string, content?: string) => Promise<void>
  deleteFile: (path: string) => Promise<void>
  renameFile: (oldPath: string, newName: string) => Promise<void>
  moveFile: (sourcePath: string, destPath: string) => Promise<void>
  getFileContent: (path: string) => Promise<string | ArrayBuffer | null>
  updateFileContent: (path: string, content: string) => Promise<void>
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  currentPath: '/',
  loading: false,

  initializeFiles: async () => {
    set({ loading: true })
    const fs = await getFileSystem()
    const files = Array.from(fs.values())
    set({ files, loading: false, currentPath: '/' })
  },

  loadDirectory: async (path: string) => {
    set({ loading: true })
    const fs = await getFileSystem()
    const files = Array.from(fs.values()).filter(file => file.parentId === getCurrentNodeId(path))
    set({ files, currentPath: path, loading: false })
  },

  createFolder: async (name: string, parentPath: string) => {
    await createDirectory(name, parentPath)
    await get().loadDirectory(parentPath)
  },

  createNewFile: async (name: string, parentPath: string, content = '') => {
    await createFile(name, parentPath, content)
    await get().loadDirectory(parentPath)
  },

  deleteFile: async (path: string) => {
    await deleteNode(path)
    const parentPath = path.substring(0, path.lastIndexOf('/')) || '/'
    await get().loadDirectory(parentPath)
  },

  renameFile: async (oldPath: string, newName: string) => {
    await renameNode(oldPath, newName)
    const parentPath = oldPath.substring(0, oldPath.lastIndexOf('/')) || '/'
    await get().loadDirectory(parentPath)
  },

  moveFile: async (sourcePath: string, destPath: string) => {
    await moveNode(sourcePath, destPath)
    const parentPath = sourcePath.substring(0, sourcePath.lastIndexOf('/')) || '/'
    await get().loadDirectory(parentPath)
  },

  getFileContent: async (path: string) => {
    const fs = await getFileSystem()
    const node = Array.from(fs.values()).find(f => f.path === path)
    return node?.content || null
  },

  updateFileContent: async (path: string, content: string) => {
    const fs = await getFileSystem()
    const node = Array.from(fs.values()).find(f => f.path === path)
    if (node && node.type === 'file') {
      node.content = content
      node.updatedAt = new Date()
      node.size = content.length
      // Save to IndexedDB would go here
    }
  },
}))

function getCurrentNodeId(path: string): string | null {
  if (path === '/') return null
  // This would need proper implementation
  return null
}
