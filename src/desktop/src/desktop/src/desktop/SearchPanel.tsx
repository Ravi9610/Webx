import React, { useState, useEffect } from 'react'
import { Search, File, AppWindow, X } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { getFileSystem } from '@/filesystem/virtualFs'

interface SearchResult {
  type: 'app' | 'file'
  id: string
  name: string
  icon: string
  path?: string
}

interface SearchPanelProps {
  onClose: () => void
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const { installedApps, launchApp } = useAppStore()

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchResults: SearchResult[] = []

    // Search apps
    installedApps.forEach(app => {
      if (app.name.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          type: 'app',
          id: app.id,
          name: app.name,
          icon: app.icon,
        })
      }
    })

    // Search files (simplified)
    const fs = getFileSystem()
    const files = Array.from(fs.values())
    files.forEach(file => {
      if (file.name.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          type: 'file',
          id: file.id,
          name: file.name,
          icon: file.type === 'directory' ? '📁' : '📄',
          path: file.path,
        })
      }
    })

    setResults(searchResults.slice(0, 10))
  }, [query, installedApps])

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'app') {
      launchApp(result.id)
    }
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 win11-start-menu w-[500px] animate-slide-down">
        <div className="p-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
            <Search size={18} className="opacity-50" />
            <input
              type="text"
              placeholder="Search apps and files..."
              className="bg-transparent outline-none flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
              <X size={16} />
            </button>
          </div>
          <div className="mt-4 space-y-1 max-h-[400px] overflow-y-auto">
            {results.map(result => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 transition-colors"
              >
                <span className="text-xl">{result.icon}</span>
                <div className="flex-1 text-left">
                  <div className="text-sm">{result.name}</div>
                  <div className="text-xs opacity-50">{result.type === 'app' ? 'Application' : result.path}</div>
                </div>
                {result.type === 'app' ? <AppWindow size={14} className="opacity-50" /> : <File size={14} className="opacity-50" />}
              </button>
            ))}
            {query.length >= 2 && results.length === 0 && (
              <div className="text-center py-8 opacity-50">No results found</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchPanel
