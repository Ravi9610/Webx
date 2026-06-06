import React, { useRef, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { useWindowStore } from '@/store/windowStore'
import WindowControls from './WindowControls'
import { WindowProps } from '@/types/window'

const WindowFrame: React.FC<WindowProps> = ({
  windowId,
  children,
  title,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 800, height: 600 },
  minWidth = 300,
  minHeight = 200,
}) => {
  const { windows, updateWindowPosition, updateWindowSize, maximizeWindow, restoreWindow, focusWindow } = useWindowStore()
  const window = windows.find(w => w.id === windowId)
  const rndRef = useRef<Rnd>(null)

  if (!window) return null

  const handleDragStop = (_e: any, d: { x: number; y: number }) => {
    updateWindowPosition(windowId, { x: d.x, y: d.y })
  }

  const handleResizeStop = (_e: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number }) => {
    updateWindowSize(windowId, { width: ref.offsetWidth, height: ref.offsetHeight })
    updateWindowPosition(windowId, { x: position.x, y: position.y })
  }

  const handleFocus = () => {
    focusWindow(windowId)
  }

  const handleMaximizeToggle = () => {
    if (window.isMaximized) {
      restoreWindow(windowId)
    } else {
      maximizeWindow(windowId)
    }
  }

  if (window.isMinimized) return null

  const isMaximized = window.isMaximized

  return (
    <Rnd
      ref={rndRef}
      position={isMaximized ? { x: 0, y: 0 } : window.position}
      size={isMaximized ? { width: '100%', height: 'calc(100% - 48px)' } : window.size}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      enableResizing={!isMaximized}
      style={{ zIndex: window.zIndex }}
      className="win11-window overflow-hidden flex flex-col"
      onClick={handleFocus}
    >
      <div className="window-drag-handle h-10 bg-white/5 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing">
        <span className="text-sm font-medium">{title}</span>
        <WindowControls
          onMinimize={() => useWindowStore.getState().minimizeWindow(windowId)}
          onMaximize={handleMaximizeToggle}
          onClose={() => useWindowStore.getState().closeWindow(windowId)}
          isMaximized={isMaximized}
        />
      </div>
      <div className="flex-1 overflow-auto bg-black/20">
        {children}
      </div>
    </Rnd>
  )
}

export default WindowFrame
