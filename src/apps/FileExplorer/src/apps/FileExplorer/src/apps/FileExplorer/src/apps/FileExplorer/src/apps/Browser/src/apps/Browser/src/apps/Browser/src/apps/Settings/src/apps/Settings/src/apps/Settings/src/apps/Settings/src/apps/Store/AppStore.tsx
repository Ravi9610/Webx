import React from 'react'
import { useAppStore } from '@/store/appStore'
import InstallButton from './InstallButton'
import Marketplace from './Marketplace'

const AppStore: React.FC<{ windowId: string }> = () => {
  const { availableApps, installedApps } = useAppStore()
  const notInstalled = availableApps.filter(a => !a.isInstalled)

  return (
    <div className="p-4 overflow-auto h-full">
      <h2 className="text-xl font-bold mb-4">Featured Apps</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {notInstalled.slice(0, 3).map(app => (
          <div key={app.id} className="bg-white/5 rounded-lg p-4">
            <div className="text-4xl mb-2">{app.icon}</div>
            <div className="font-semibold">{app.name}</div>
            <div className="text-xs opacity-70 mb-2">{app.description}</div>
            <InstallButton appId={app.id} />
          </div>
        ))}
      </div>
      <Marketplace />
    </div>
  )
}

export default AppStore
