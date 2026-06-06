import React from 'react'
import { useAppStore } from '@/store/appStore'
import InstallButton from './InstallButton'

const Marketplace: React.FC = () => {
  const { availableApps, installedApps } = useAppStore()
  const notInstalled = availableApps.filter(a => !a.isInstalled)

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">All Apps</h3>
      <div className="space-y-2">
        {notInstalled.map(app => (
          <div key={app.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{app.icon}</span>
              <div>
                <div className="font-medium">{app.name}</div>
                <div className="text-xs opacity-70">{app.description}</div>
              </div>
            </div>
            <InstallButton appId={app.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marketplace
