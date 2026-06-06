import React from 'react'
import { Plus, X } from 'lucide-react'

interface TabsProps {
  tabs: { id: string; title: string }[]
  activeId: string
  onSelect: (id: string) => void
  onClose: (id: string) => void
  onAdd: () => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onSelect, onClose, onAdd }) => {
  return (
    <div className="flex items-center border-b border-white/10 overflow-x-auto">
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`flex items-center gap-2 px-3 py-2 border-r border-white/10 cursor-pointer transition-colors ${
            activeId === tab.id ? 'bg-white/10' : 'hover:bg-white/5'
          }`}
        >
          <span className="text-sm">{tab.title.length > 20 ? tab.title.slice(0, 20) + '...' : tab.title}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(tab.id) }}
            className="p-0.5 rounded hover:bg-white/20"
          >
            <X size={12} />
          </button>
        </div>
      ))}
      <button onClick={onAdd} className="p-2 hover:bg-white/10 transition-colors"><Plus size={14} /></button>
    </div>
  )
}

export default Tabs
