import { useFileStore } from '@/store/fileStore'

export function useFiles() {
  const { files, currentPath, loading, loadDirectory, createFolder, createNewFile, deleteFile, renameFile, moveFile, getFileContent, updateFileContent } = useFileStore()
  return { files, currentPath, loading, loadDirectory, createFolder, createNewFile, deleteFile, renameFile, moveFile, getFileContent, updateFileContent }
}
