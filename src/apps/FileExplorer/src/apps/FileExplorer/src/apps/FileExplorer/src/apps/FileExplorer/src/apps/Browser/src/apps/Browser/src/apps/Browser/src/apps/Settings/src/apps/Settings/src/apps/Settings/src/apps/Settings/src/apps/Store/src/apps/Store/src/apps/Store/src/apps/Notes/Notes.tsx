import React, { useState, useEffect } from 'react'
import { useFileStore } from '@/store/fileStore'

const Notes: React.FC<{ windowId: string }> = () => {
  const [content, setContent] = useState('')
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const { getFileContent, updateFileContent, createNewFile, files } = useFileStore()
  const notesFiles = files.filter(f => f.extension === 'txt' && f.path.startsWith('/Documents'))

  useEffect(() => {
    if (notesFiles.length > 0 && !currentFile) {
      loadNote(notesFiles[0].path)
    }
  }, [notesFiles])

  const loadNote = async (path: string) => {
    const text = await getFileContent(path)
    setContent(typeof text === 'string' ? text : '')
    setCurrentFile(path)
  }

  const saveNote = async () => {
    if (currentFile) {
      await updateFileContent(currentFile, content)
    } else {
      const name = `note-${Date.now()}.txt`
      await createNewFile(name, '/Documents', content)
    }
  }

  const newNote = async () => {
    setContent('')
    setCurrentFile(null)
  }

  return (
    <div className="flex h-full">
      <div className="w-48 border-r border-white/10 p-2">
        <button onClick={newNote} className="w-full mb-2 px-3 py-1 bg-win11-accent rounded text-sm">+ New Note</button>
        <div className="space-y-1">
          {notesFiles.map(file => (
            <button key={file.id} onClick={() => loadNote(file.path)} className={`w-full text-left p-2 rounded text-sm ${currentFile === file.path ? 'bg-white/20' : 'hover:bg-white/10'}`}>
              {file.name.replace('.txt', '')}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="flex-1 bg-transparent p-4 outline-none resize-none font-mono" placeholder="Write your note here..." />
        <div className="p-2 border-t border-white/10 flex justify-end">
          <button onClick={saveNote} className="px-4 py-1 bg-win11-accent rounded text-sm">Save</button>
        </div>
      </div>
    </div>
  )
}

export default Notes
