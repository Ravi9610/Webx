import React, { useState } from 'react'
import Appearance from './Appearance'
import Account from './Account'
import Storage from './Storage'

const Settings: React.FC<{ windowId: string }> = () => {
  const [activeSection, setActiveSection] = useState('appearance')

  const sections = [
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'storage', name: 'Storage', icon: '💾' },
  ]

  return (
    <div className="flex h-full">
      <div className="w-48 border-r border-white/10 p-2 space-y-1">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full flex items-center gap-2 p-2 rounded transition-colors ${
              activeSection === section.id ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <span>{section.icon}</span>
            <span>{section.name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {activeSection === 'appearance' && <Appearance />}
        {activeSection === 'account' && <Account />}
        {activeSection === 'storage' && <Storage />}
      </div>
    </div>
  )
}

export default Settings
