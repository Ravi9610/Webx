import React, { useEffect, useRef } from 'react'

interface MenuItem {
  label: string
  onClick: () => void
  disabled?: boolean
  divider?: boolean
}

interface ContextMenuProps {
  x: number
  y: number
  items: MenuItem[]
  onClose: () => void
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [onClose])

  // Adjust position to stay in viewport
  let adjustedX = x
  let adjustedY = y
  if (menuRef.current) {
    const rect = menuRef.current.getBoundingClientRect()
    if (x + rect.width > window.innerWidth) adjustedX = window.innerWidth - rect.width - 10
    if (y + rect.height > window.innerHeight) adjustedY = window.innerHeight - rect.height - 10
  }

  return (
    <div
      ref={menuRef}
      className="fixed win11-context-menu py-1 z-[1000]"
      style={{ left: adjustedX, top: adjustedY }}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.divider ? <div className="h-px bg-white/10 my-1" /> : null}
          <button
            onClick={() => { item.onClick(); onClose() }}
            disabled={item.disabled}
            className="w-full text-left px-4 py-1.5 text-sm hover:bg-white/10 disabled:opacity-50 transition-colors"
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContextMenu
