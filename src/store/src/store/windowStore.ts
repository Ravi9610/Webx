import { create } from 'zustand'
import { WindowState, WindowPosition, WindowSize } from '@/types/window'

interface WindowStore {
  windows: WindowState[]
  nextZIndex: number
  openWindow: (appId: string, title: string, defaultSize?: WindowSize) => string
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updateWindowPosition: (id: string, position: WindowPosition) => void
  updateWindowSize: (id: string, size: WindowSize) => void
  focusWindow: (id: string) => void
  setWindowZIndex: (id: string, zIndex: number) => void
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 100,

  openWindow: (appId, title, defaultSize = { width: 800, height: 600 }) => {
    const id = `window-${Date.now()}-${Math.random()}`
    const zIndex = get().nextZIndex
    
    set((state) => ({
      windows: [...state.windows, {
        id,
        appId,
        title,
        position: { x: 100 + state.windows.length * 30, y: 100 + state.windows.length * 30 },
        size: defaultSize,
        zIndex,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
      }],
      nextZIndex: zIndex + 1,
    }))
    
    // Unfocus other windows
    get().windows.forEach(w => {
      if (w.isFocused) {
        set((state) => ({
          windows: state.windows.map(win => 
            win.id === w.id ? { ...win, isFocused: false } : win
          )
        }))
      }
    })
    
    return id
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id)
    }))
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      )
    }))
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMaximized: true, isMinimized: false } : w
      )
    }))
  },

  restoreWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMaximized: false, isMinimized: false } : w
      )
    }))
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, position } : w
      )
    }))
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, size } : w
      )
    }))
  },

  focusWindow: (id) => {
    const window = get().windows.find(w => w.id === id)
    if (window && !window.isFocused) {
      const newZIndex = get().nextZIndex
      set((state) => ({
        windows: state.windows.map(w => ({
          ...w,
          isFocused: w.id === id,
          zIndex: w.id === id ? newZIndex : w.zIndex,
        })),
        nextZIndex: newZIndex + 1,
      }))
    }
  },

  setWindowZIndex: (id, zIndex) => {
    set((state) => ({
      windows: state.windows.map(w => 
        w.id === id ? { ...w, zIndex } : w
      )
    }))
  },
}))
