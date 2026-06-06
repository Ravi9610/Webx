import { getFileSystem, saveFile } from '@/filesystem/indexedDb'

let syncInterval: number | null = null

export async function startSync(intervalMs: number = 30000) {
  if (syncInterval) clearInterval(syncInterval)
  syncInterval = window.setInterval(() => syncFiles(), intervalMs)
}

export async function stopSync() {
  if (syncInterval) {
    clearInterval(syncInterval)
    syncInterval = null
  }
}

async function syncFiles() {
  try {
    const fs = await getFileSystem()
    const files = Array.from(fs.values())
    // In a real app, send to server
    console.log(`Syncing ${files.length} files...`)
  } catch (error) {
    console.error('Sync failed:', error)
  }
}
