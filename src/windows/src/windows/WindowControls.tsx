import React from 'react'
import { Minus, Square, X, Maximize2 } from 'lucide-react'

interface WindowControlsProps {
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
  isMaximized?: boolean
}

const WindowControls: React.FC<WindowControlsProps> = ({ onMinimize, onMaximize, onClose, isMaximized }) => {
  return (
    <div className="flex gap-2 window-non-draggable">
      <button
        onClick={onMinimize}
        className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center transition-colors"
      >
        <Minus size={14} />
      </button>
      <button
        onClick={onMaximize}
        className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center transition-colors"
      >
        {isMaximized ? <Maximize2 size={14} /> : <Square size={14} />}
      </button>
      <button
        onClick={onClose}
        className="w-8 h-8 rounded hover:bg-red-500/80 flex items-center justify-center transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export default WindowControls
