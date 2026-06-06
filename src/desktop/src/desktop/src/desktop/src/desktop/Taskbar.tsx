import React, { useState, useEffect } from 'react'
import { useWindowStore } from '@/store/windowStore'
import { useAppStore } from '@/store/appStore'
import { useSettingsStore } from '@/store/settingsStore'
import StartMenu from './StartMenu'
import NotificationCenter from './NotificationCenter'
import { Home, Search, ChevronUp, Wifi, Volume2, Battery, Clock } from 'lucide-react'

const Taskbar: React.FC = () => {
  const { windows, focusWindow, minimizeWindow, restoreWindow } = useWindowStore()
  const { taskbarPosition } = useSettingsStore()
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getPositionClasses = () => {
    switch (taskbarPosition) {
      case 'top': return 'top-0 left-0 right-0 flex-row'
      case 'bottom': return 'bottom-0 left-0 right-0 flex-row'
      case 'left': return 'left-0 top-0 bottom-0 flex-col w-12'
      case 'right': return 'right-0 top-0 bottom-0 flex-col w-12'
      default: return 'bottom-0 left-0 right-0 flex-row'
    }
  }

  const isHorizontal = taskbarPosition === 'top' || taskbarPosition === 'bottom'

  return (
    <>
      <div className={`fixed ${getPositionClasses()} taskbar-glass z-50`}>
        <div className={`flex items-center ${isHorizontal ? 'justify-between px-2' : 'flex-col h-full py-2'}`}>
          <button
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="p-2 rounded hover:bg-win11-hover transition-colors"
          >
            <Home size={20} />
          </button>

          <button className="p-2 rounded hover:bg-win11-hover transition-colors">
            <Search size={20} />
          </button>

          <div className={`flex ${isHorizontal ? 'flex-row gap-1' : 'flex-col gap-2'} flex-1 ${isHorizontal ? 'justify-center' : 'justify-start'}`}>
            {windows.filter(w => !w.isMinimized).map(window => (
              <button
                key={window.id}
                onClick={() => focusWindow(window.id)}
                className={`px-3 py-1 rounded transition-colors ${window.isFocused ? 'bg-win11-active' : 'hover:bg-win11-hover'}`}
              >
                {window.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-win11-hover transition-colors">
              <Wifi size={16} />
            </button>
            <button className="p-2 rounded hover:bg-win11-hover transition-colors">
              <Volume2 size={16} />
            </button>
            <button className="p-2 rounded hover:bg-win11-hover transition-colors">
              <Battery size={16} />
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded hover:bg-win11-hover transition-colors"
            >
              <ChevronUp size={16} />
            </button>
            <div className="px-2">
              <Clock size={16} />
              <span className="text-xs ml-1">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} />}
      {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
    </>
  )
}

export default Taskbar
