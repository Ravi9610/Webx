import React from 'react'
import { useAppStore } from '@/store/appStore'
import { useSettingsStore } from '@/store/settingsStore'
import { Power, Settings, User } from 'lucide-react'

interface StartMenuProps {
  onClose: () => void
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { installedApps, launchApp } = useAppStore()
  const { theme } = useSettingsStore()

  const pinnedApps = installedApps.slice(0, 6)
  const allApps = installedApps.slice(6)

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed bottom-12 left-2 z-50 win11-start-menu w-[600px] h-[600px] overflow-hidden animate-slide-up">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/3 bg-white/5 p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-win11-accent flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold">User</div>
                <div className="text-xs opacity-70">user@webos.local</div>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 transition-colors">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 transition-colors mt-auto absolute bottom-4 left-4 right-4">
              <Power size={18} />
              <span>Shut down</span>
            </button>
          </div>

          {/* Main area */}
          <div className="flex-1 p-4">
            <div className="mb-4">
              <h3 className="text-xs uppercase opacity-50 mb-2">Pinned</h3>
              <div className="grid grid-cols-3 gap-3">
                {pinnedApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => { launchApp(app.id); onClose() }}
                    className="flex flex-col items-center p-2 rounded hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl mb-1">{app.icon}</span>
                    <span className="text-xs">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs uppercase opacity-50 mb-2">All apps</h3>
              <div className="space-y-1 max-h-[350px] overflow-y-auto">
                {allApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => { launchApp(app.id); onClose() }}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xl">{app.icon}</span>
                    <span className="text-sm">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StartMenu
