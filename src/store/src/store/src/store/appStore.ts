import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { App } from '@/types/app'

interface AppStore {
  availableApps: App[]
  installedApps: App[]
  installApp: (appId: string) => Promise<void>
  uninstallApp: (appId: string) => Promise<void>
  initializeApps: () => Promise<void>
  launchApp: (appId: string) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      availableApps: [
        { id: 'file-explorer', name: 'File Explorer', description: 'Manage your files', version: '1.0.0', author: 'WebOS', icon: '📁', isInstalled: true, isSystemApp: true },
        { id: 'browser', name: 'Web Browser', description: 'Browse the internet', version: '1.0.0', author: 'WebOS', icon: '🌐', isInstalled: true, isSystemApp: true },
        { id: 'settings', name: 'Settings', description: 'Configure your system', version: '1.0.0', author: 'WebOS', icon: '⚙️', isInstalled: true, isSystemApp: true },
        { id: 'store', name: 'App Store', description: 'Install new apps', version: '1.0.0', author: 'WebOS', icon: '🛒', isInstalled: true, isSystemApp: true },
        { id: 'terminal', name: 'Terminal', description: 'Command line interface', version: '1.0.0', author: 'WebOS', icon: '💻', isInstalled: true, isSystemApp: true },
        { id: 'notes', name: 'Notes', description: 'Take notes', version: '1.0.0', author: 'WebOS', icon: '📝', isInstalled: false, isSystemApp: false },
        { id: 'calculator', name: 'Calculator', description: 'Calculate numbers', version: '1.0.0', author: 'WebOS', icon: '🔢', isInstalled: false, isSystemApp: false },
        { id: 'paint', name: 'Paint', description: 'Draw and edit images', version: '1.0.0', author: 'WebOS', icon: '🎨', isInstalled: false, isSystemApp: false },
        { id: 'media-player', name: 'Media Player', description: 'Play audio and video', version: '1.0.0', author: 'WebOS', icon: '🎵', isInstalled: false, isSystemApp: false },
        { id: 'calendar', name: 'Calendar', description: 'Manage your schedule', version: '1.0.0', author: 'WebOS', icon: '📅', isInstalled: false, isSystemApp: false },
        { id: 'ai-assistant', name: 'AI Assistant', description: 'AI-powered assistant', version: '1.0.0', author: 'WebOS', icon: '🤖', isInstalled: false, isSystemApp: false },
      ],
      installedApps: [],
      
      initializeApps: async () => {
        const { availableApps } = get()
        const installed = availableApps.filter(app => app.isInstalled)
        set({ installedApps: installed })
      },
      
      installApp: async (appId) => {
        const { availableApps, installedApps } = get()
        const app = availableApps.find(a => a.id === appId)
        if (app && !app.isInstalled) {
          app.isInstalled = true
          app.installDate = new Date()
          set({ installedApps: [...installedApps, app] })
        }
      },
      
      uninstallApp: async (appId) => {
        const { availableApps, installedApps } = get()
        const app = availableApps.find(a => a.id === appId)
        if (app && !app.isSystemApp) {
          app.isInstalled = false
          set({ installedApps: installedApps.filter(a => a.id !== appId) })
        }
      },
      
      launchApp: (appId) => {
        const { installedApps } = get()
        const app = installedApps.find(a => a.id === appId)
        if (app) {
          // This will be handled by the window manager
          window.dispatchEvent(new CustomEvent('launch-app', { detail: { appId } }))
        }
      },
    }),
    {
      name: 'app-storage',
    }
  )
)
