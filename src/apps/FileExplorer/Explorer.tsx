import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import FolderView from './FolderView'
import Breadcrumb from './Breadcrumb'
import { useFileStore } from '@/store/fileStore'

interface ExplorerProps {
  windowId: string
}

const FileExplorer: React.FC<ExplorerProps> = ({ windowId }) => {
  const { currentPath, loadDirectory, files } = useFileStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    loadDirectory(currentPath)
  }, [currentPath])

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-2 border-b border-white/10 flex items-center justify-between">
          <Breadcrumb />
          <div className="flex gap-1">
            <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'}`}>📱</button>
            <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'}`}>📋</button>
          </div>
        </div>
        <FolderView viewMode={viewMode} />
      </div>
    </div>
  )
}

export default FileExplorer
