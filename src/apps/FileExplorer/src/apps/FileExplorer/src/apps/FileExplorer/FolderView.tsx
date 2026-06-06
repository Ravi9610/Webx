import React from 'react'
import { useFileStore } from '@/store/fileStore'
import { getFileTypeInfo } from '@/filesystem/fileTypes'
import { useAppStore } from '@/store/appStore'

interface FolderViewProps {
  viewMode: 'grid' | 'list'
}

const FolderView: React.FC<FolderViewProps> = ({ viewMode }) => {
  const { files, loadDirectory, currentPath } = useFileStore()
  const { launchApp } = useAppStore()

  const handleDoubleClick = (file: any) => {
    if (file.type === 'directory') {
      loadDirectory(file.path)
    } else {
      // Open file with appropriate app
      const fileInfo = getFileTypeInfo(file.name)
      if (fileInfo.extension === 'txt') launchApp('notes')
      else if (fileInfo.mimeType.startsWith('image/')) launchApp('paint')
      else if (fileInfo.mimeType.startsWith('audio/')) launchApp('media-player')
      else console.log('Open file:', file.path)
    }
  }

  if (viewMode === 'grid') {
    return (
      <div className="p-4 grid grid-cols-4 gap-4 overflow-auto flex-1 content-start">
        {files.map(file => {
          const fileInfo = getFileTypeInfo(file.name)
          return (
            <div
              key={file.id}
              onDoubleClick={() => handleDoubleClick(file)}
              className="flex flex-col items-center p-2 rounded hover:bg-white/10 cursor-pointer transition-colors"
            >
              <div className="text-3xl mb-1">{file.type === 'directory' ? '📁' : fileInfo.icon}</div>
              <div className="text-xs text-center">{file.name}</div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10">
          <tr><th className="text-left p-2">Name</th><th className="text-left p-2">Size</th><th className="text-left p-2">Modified</th></tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id} onDoubleClick={() => handleDoubleClick(file)} className="hover:bg-white/5 cursor-pointer">
              <td className="p-2">{file.type === 'directory' ? '📁' : '📄'} {file.name}</td>
              <td className="p-2">{file.type === 'file' ? file.size : '-'}</td>
              <td className="p-2">{new Date(file.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FolderView
