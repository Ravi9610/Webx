import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DesktopIcon {
  id: string
  name: string
  icon: string
  appId: string
  position: { x: number; y: number }
}

interface DesktopState {
  icons: DesktopIcon[]
  wallpaper: string
  addIcon: (icon: DesktopIcon) => void
  removeIcon: (id: string) => void
  updateIconPosition: (id: string, position: { x: number; y: number }) => void
  setWallpaper: (wallpaper: string) => void
}

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set) => ({
      icons: [
        { id: '1', name: 'File Explorer', icon: '📁', appId: 'file-explorer', position: { x: 20, y: 20 } },
        { id: '2', name: 'Browser', icon: '🌐', appId: 'browser', position: { x: 20, y: 120 } },
        { id: '3', name: 'Settings', icon: '⚙️', appId: 'settings', position: { x: 20, y: 220 } },
        { id: '4', name: 'Store', icon: '🛒', appId: 'store', position: { x: 20, y: 320 } },
        { id: '5', name: 'Terminal', icon: '💻', appId: 'terminal', position: { x: 20, y: 420 } },
      ],
      wallpaper: '/wallpapers/default.jpg',
      addIcon: (icon) => set((state) => ({ icons: [...state.icons, icon] })),
      removeIcon: (id) => set((state) => ({ icons: state.icons.filter(i => i.id !== id) })),
      updateIconPosition: (id, position) => set((state) => ({
        icons: state.icons.map(i => i.id === id ? { ...i, position } : i)
      })),
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: 'desktop-storage',
    }
  )
)
