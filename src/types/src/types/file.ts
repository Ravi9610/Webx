export interface FileEntry {
  id: string
  name: string
  path: string
  type: 'file' | 'directory'
  parentId: string | null
  content?: string | ArrayBuffer
  size: number
  createdAt: Date
  updatedAt: Date
  extension?: string
  mimeType?: string
}

export interface FileSystemNode {
  id: string
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileSystemNode[]
  size: number
  modified: Date
}
