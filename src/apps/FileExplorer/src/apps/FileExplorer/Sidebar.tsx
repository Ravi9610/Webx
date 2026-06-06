import React from 'react'
import { useFileStore } from '@/store/fileStore'

const Sidebar: React.FC = () => {
  const { loadDirectory } = useFileStore()
  
  const locations = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Documents', path: '/Documents', icon: '📄' },
    { name: 'Downloads', path: '/Downloads', icon: '⬇️' },
    { name: 'Pictures', path: '/Pictures', icon: '🖼️' },
    { name: 'Music', path: '/Music', icon: '🎵' },
    { name: 'Videos', path: '/Videos', icon: '🎬' },
  ]

  return (
    <div className="w-48 border-r border-white/10 p-2 space-y-1">
      {locations.map(loc => (
        <button
          key={loc.path}
          onClick={() => loadDirectory(loc.path)}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors"
        >
          <span>{loc.icon}</span>
          <span className="text-sm">{loc.name}</span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar
