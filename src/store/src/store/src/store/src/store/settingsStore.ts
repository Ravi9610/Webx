import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark'
  accentColor: string
  taskbarPosition: 'bottom' | 'top' | 'left' | 'right'
  transparency: boolean
  animations: boolean
  setTheme: (theme: 'light' | 'dark') => void
  setAccentColor: (color: string) => void
  setTaskbarPosition: (position: 'bottom' | 'top' | 'left' | 'right') => void
  setTransparency: (enabled: boolean) => void
  setAnimations: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      accentColor: '#0078d4',
      taskbarPosition: 'bottom',
      transparency: true,
      animations: true,
      setTheme: (theme) => set({ theme }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setTaskbarPosition: (taskbarPosition) => set({ taskbarPosition }),
      setTransparency: (transparency) => set({ transparency }),
      setAnimations: (animations) => set({ animations }),
    }),
    {
      name: 'settings-storage',
    }
  )
)
