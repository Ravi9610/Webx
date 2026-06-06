import { getFileSystem } from '@/filesystem/virtualFs'

export async function getAutocompleteSuggestions(partial: string, currentPath: string): Promise<string[]> {
  const fs = await getFileSystem()
  const entries = Array.from(fs.values())
  
  const suggestions = entries
    .filter(entry => entry.name.startsWith(partial) && entry.parentId === getCurrentNodeId(currentPath))
    .map(entry => entry.name)
  
  return suggestions
}

function getCurrentNodeId(path: string): string | null {
  // Implementation would map path to node ID
  return null
}
