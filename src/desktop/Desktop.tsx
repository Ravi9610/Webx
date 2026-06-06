import React, { useEffect, useState } from 'react'
import Wallpaper from './Wallpaper'
import Icons from './Icons'
import Taskbar from './Taskbar'
import { useWindowStore } from '@/store/windowStore'
import { getAppComponent } from '@/kernel/appRegistry'
import WindowFrame from '@/windows/WindowFrame'

const Desktop: React.FC = () => {
  const { windows } = useWindowStore()
  const [appInstances, setAppInstances] = useState<Map<string, React.ReactNode>>(new Map())

  useEffect(() => {
    const handleLaunchApp = (e: CustomEvent) => {
      const { appId, windowId, props } = e.detail
      const AppComponent = getAppComponent(appId)
      if (AppComponent && !appInstances.has(windowId)) {
        setAppInstances(prev => {
          const newMap = new Map(prev)
          newMap.set(windowId, <AppComponent key={windowId} windowId={windowId} {...props} />)
          return newMap
        })
      }
    }

    window.addEventListener('app-launched', handleLaunchApp as EventListener)
    return () => window.removeEventListener('app-launched', handleLaunchApp as EventListener)
  }, [appInstances])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Wallpaper />
      <Icons />
      {windows.map(window => (
        <WindowFrame key={window.id} windowId={window.id}>
          {appInstances.get(window.id)}
        </WindowFrame>
      ))}
      <Taskbar />
    </div>
  )
}

export default Desktop
