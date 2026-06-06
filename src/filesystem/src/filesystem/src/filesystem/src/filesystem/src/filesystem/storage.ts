export async function getStorageUsage(): Promise<{ used: number; total: number; percentage: number }> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate()
    const used = estimate.usage || 0
    const total = estimate.quota || 0
    return {
      used,
      total,
      percentage: total > 0 ? (used / total) * 100 : 0,
    }
  }
  return { used: 0, total: 0, percentage: 0 }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
