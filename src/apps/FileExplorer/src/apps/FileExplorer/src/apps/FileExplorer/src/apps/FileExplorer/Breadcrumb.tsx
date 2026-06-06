import React from 'react'
import { useFileStore } from '@/store/fileStore'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb: React.FC = () => {
  const { currentPath, loadDirectory } = useFileStore()
  const parts = currentPath === '/' ? [] : currentPath.split('/').filter(Boolean)

  const navigateTo = (index: number) => {
    const path = '/' + parts.slice(0, index + 1).join('/')
    loadDirectory(path || '/')
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button onClick={() => loadDirectory('/')} className="p-1 rounded hover:bg-white/10">
        <Home size={16} />
      </button>
      {parts.map((part, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={14} className="opacity-50" />
          <button onClick={() => navigateTo(idx)} className="p-1 rounded hover:bg-white/10">
            {part}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumb
