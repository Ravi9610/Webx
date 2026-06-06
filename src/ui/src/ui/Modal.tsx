import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 win11-window w-[500px] max-w-[90vw]">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10"><X size={16} /></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  )
}
