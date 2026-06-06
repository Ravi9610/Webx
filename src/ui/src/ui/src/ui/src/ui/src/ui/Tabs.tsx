import React from 'react'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  activeId: string
  onTabChange: (id: string) => void
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onTabChange }) => {
  return (
    <div>
      <div className="flex border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm transition-colors ${
              activeId === tab.id ? 'border-b-2 border-win11-accent text-win11-accent' : 'hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{tabs.find(t => t.id === activeId)?.content}</div>
    </div>
  )
}
