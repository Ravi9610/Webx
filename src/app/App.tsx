import React, { useEffect } from 'react'
import Desktop from '@/desktop/Desktop'
import { useWindowStore } from '@/store/windowStore'
import { useAppStore } from '@/store/appStore'
import { useFileStore } from '@/store/fileStore'
import { initializeFileSystem } from '@/filesystem/virtualFs'

function App() {
  const { windows } = useWindowStore()
  const { initializeApps } = useAppStore()
  const { initializeFiles } = useFileStore()

  useEffect(() => {
    // Initialize core systems
    const init = async () => {
      await initializeFileSystem()
      await initializeFiles()
      await initializeApps()
    }
    init()
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Desktop />
    </div>
  )
}

export default App
