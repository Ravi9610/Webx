import { openDB, DBSchema, IDBPDatabase } from 'idb'

interface WebOSDB extends DBSchema {
  files: {
    key: string
    value: {
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
    indexes: { 'by-path': string; 'by-parent': string }
  }
  settings: {
    key: string
    value: any
  }
  apps: {
    key: string
    value: any
  }
}

let dbInstance: IDBPDatabase<WebOSDB> | null = null

export async function initDatabase(): Promise<IDBPDatabase<WebOSDB>> {
  if (dbInstance) return dbInstance

  dbInstance = await openDB<WebOSDB>('webos-db', 1, {
    upgrade(db) {
      // Files store
      const fileStore = db.createObjectStore('files', { keyPath: 'id' })
      fileStore.createIndex('by-path', 'path', { unique: true })
      fileStore.createIndex('by-parent', 'parentId')

      // Settings store
      db.createObjectStore('settings')

      // Apps store
      db.createObjectStore('apps')
    },
  })

  return dbInstance
}

export async function getFile(path: string) {
  const db = await initDatabase()
  return db.getFromIndex('files', 'by-path', path)
}

export async function saveFile(file: any) {
  const db = await initDatabase()
  return db.put('files', file)
}

export async function deleteFile(path: string) {
  const db = await initDatabase()
  const file = await getFile(path)
  if (file) {
    return db.delete('files', file.id)
  }
}

export async function getAllFiles() {
  const db = await initDatabase()
  return db.getAll('files')
}
