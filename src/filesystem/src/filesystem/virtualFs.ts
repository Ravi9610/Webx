import { initDatabase, getFile, saveFile, deleteFile, getAllFiles } from './indexedDb'
import { FileEntry } from '@/types/file'

let fileSystem = new Map<string, FileEntry>()

export async function initializeFileSystem() {
  const files = await getAllFiles()
  fileSystem.clear()
  files.forEach(file => {
    fileSystem.set(file.path, file)
  })

  // Create root if not exists
  if (!fileSystem.has('/')) {
    const root: FileEntry = {
      id: 'root',
      name: 'root',
      path: '/',
      type: 'directory',
      parentId: null,
      size: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    fileSystem.set('/', root)
    await saveFile(root)
  }

  // Create default folders
  const defaultFolders = ['Documents', 'Downloads', 'Pictures', 'Music', 'Videos']
  for (const folder of defaultFolders) {
    const folderPath = `/${folder}`
    if (!fileSystem.has(folderPath)) {
      const folderEntry: FileEntry = {
        id: `folder-${folder}`,
        name: folder,
        path: folderPath,
        type: 'directory',
        parentId: 'root',
        size: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      fileSystem.set(folderPath, folderEntry)
      await saveFile(folderEntry)
    }
  }
}

export async function getFileSystem() {
  return fileSystem
}

export async function createDirectory(name: string, parentPath: string) {
  const path = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`
  if (fileSystem.has(path)) {
    throw new Error('Directory already exists')
  }

  const parent = fileSystem.get(parentPath)
  if (!parent || parent.type !== 'directory') {
    throw new Error('Invalid parent path')
  }

  const entry: FileEntry = {
    id: `dir-${Date.now()}-${Math.random()}`,
    name,
    path,
    type: 'directory',
    parentId: parent.id,
    size: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  fileSystem.set(path, entry)
  await saveFile(entry)
  return entry
}

export async function createFile(name: string, parentPath: string, content: string = '') {
  const path = parentPath === '/' ? `/${name}` : `${parentPath}/${name}`
  if (fileSystem.has(path)) {
    throw new Error('File already exists')
  }

  const parent = fileSystem.get(parentPath)
  if (!parent || parent.type !== 'directory') {
    throw new Error('Invalid parent path')
  }

  const extension = name.includes('.') ? name.split('.').pop() : undefined
  const entry: FileEntry = {
    id: `file-${Date.now()}-${Math.random()}`,
    name,
    path,
    type: 'file',
    parentId: parent.id,
    content,
    size: content.length,
    createdAt: new Date(),
    updatedAt: new Date(),
    extension,
    mimeType: getMimeType(extension),
  }

  fileSystem.set(path, entry)
  await saveFile(entry)
  return entry
}

export async function deleteNode(path: string) {
  const node = fileSystem.get(path)
  if (!node) throw new Error('Path not found')

  // Delete children if directory
  if (node.type === 'directory') {
    const children = Array.from(fileSystem.values()).filter(f => f.path.startsWith(path + '/'))
    for (const child of children) {
      fileSystem.delete(child.path)
      await deleteFile(child.path)
    }
  }

  fileSystem.delete(path)
  await deleteFile(path)
}

export async function renameNode(oldPath: string, newName: string) {
  const node = fileSystem.get(oldPath)
  if (!node) throw new Error('Path not found')

  const parentPath = oldPath.substring(0, oldPath.lastIndexOf('/')) || '/'
  const newPath = parentPath === '/' ? `/${newName}` : `${parentPath}/${newName}`

  if (fileSystem.has(newPath)) {
    throw new Error('A file or directory with that name already exists')
  }

  // Update node
  node.name = newName
  node.path = newPath
  node.updatedAt = new Date()
  fileSystem.delete(oldPath)
  fileSystem.set(newPath, node)
  await saveFile(node)

  // Update children paths if directory
  if (node.type === 'directory') {
    const children = Array.from(fileSystem.values()).filter(f => f.path.startsWith(oldPath + '/'))
    for (const child of children) {
      const newChildPath = child.path.replace(oldPath, newPath)
      fileSystem.delete(child.path)
      child.path = newChildPath
      fileSystem.set(newChildPath, child)
      await saveFile(child)
    }
  }
}

export async function moveNode(sourcePath: string, destPath: string) {
  const node = fileSystem.get(sourcePath)
  if (!node) throw new Error('Source not found')

  const destNode = fileSystem.get(destPath)
  if (!destNode || destNode.type !== 'directory') {
    throw new Error('Destination must be a directory')
  }

  const newPath = destPath === '/' ? `/${node.name}` : `${destPath}/${node.name}`
  if (fileSystem.has(newPath)) {
    throw new Error('A file or directory already exists at destination')
  }

  // Update node
  node.parentId = destNode.id
  node.path = newPath
  node.updatedAt = new Date()
  fileSystem.delete(sourcePath)
  fileSystem.set(newPath, node)
  await saveFile(node)

  // Update children if directory
  if (node.type === 'directory') {
    const children = Array.from(fileSystem.values()).filter(f => f.path.startsWith(sourcePath + '/'))
    for (const child of children) {
      const newChildPath = child.path.replace(sourcePath, newPath)
      fileSystem.delete(child.path)
      child.path = newChildPath
      fileSystem.set(newChildPath, child)
      await saveFile(child)
    }
  }
}

function getMimeType(extension?: string): string {
  const mimeTypes: Record<string, string> = {
    txt: 'text/plain',
    json: 'application/json',
    js: 'application/javascript',
    html: 'text/html',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    pdf: 'application/pdf',
  }
  return extension ? mimeTypes[extension] || 'application/octet-stream' : 'text/plain'
}
