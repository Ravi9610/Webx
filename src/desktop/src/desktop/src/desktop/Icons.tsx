import React, { useState } from 'react'
import { useDesktopStore } from '@/store/desktopStore'
import { useAppStore } from '@/store/appStore'
import ContextMenu from '@/ui/ContextMenu'

const Icons: React.FC = () => {
  const { icons, updateIconPosition } = useDesktopStore()
  const { launchApp } = useAppStore()
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; iconId: string } | null>(null)

  const handleDoubleClick = (appId: string) => {
    launchApp(appId)
  }

  const handleContextMenu = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, iconId })
  }

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('iconId', id)
  }

  const handleDrop = (e: React.DragEvent, id: string) => {
    const draggedId = e.dataTransfer.getData('iconId')
    if (draggedId && draggedId !== id) {
      // Swap positions
      const draggedIcon = icons.find(i => i.id === draggedId)
      const targetIcon = icons.find(i => i.id === id)
      if (draggedIcon && targetIcon) {
        updateIconPosition(draggedId, targetIcon.position)
        updateIconPosition(id, draggedIcon.position)
      }
    }
    setContextMenu(null)
  }

  return (
    <>
      <div className="absolute top-0 left-0 p-4 space-y-4">
        {icons.map(icon => (
          <div
            key={icon.id}
            draggable
            onDragStart={(e) => handleDragStart(e, icon.id)}
            onDrop={(e) => handleDrop(e, icon.id)}
            onDragOver={(e) => e.preventDefault()}
            onDoubleClick={() => handleDoubleClick(icon.appId)}
            onContextMenu={(e) => handleContextMenu(e, icon.id)}
            className="flex flex-col items-center w-24 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors group"
            style={{ transform: `translate(${icon.position.x}px, ${icon.position.y}px)` }}
          >
            <span className="text-4xl mb-1">{icon.icon}</span>
            <span className="text-xs text-white text-center bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={[
            { label: 'Open', onClick: () => handleDoubleClick(icons.find(i => i.id === contextMenu.iconId)?.appId || '') },
            { label: 'Delete', onClick: () => useDesktopStore.getState().removeIcon(contextMenu.iconId) },
            { label: 'Properties', onClick: () => console.log('Properties') },
          ]}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  )
}

export default Icons
