import React, { createContext, useContext } from 'react'

interface WindowContextValue {
  windowId: string
  isFocused: boolean
  isMaximized: boolean
  isMinimized: boolean
}

const WindowContext = createContext<WindowContextValue | null>(null)

export function useWindowContext() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowProvider')
  }
  return context
}

export const WindowProvider = WindowContext.Provider
