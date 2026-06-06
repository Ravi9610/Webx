export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface WindowState {
  id: string
  appId: string
  title: string
  position: WindowPosition
  size: WindowSize
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  isFocused: boolean
}

export interface WindowProps {
  windowId: string
  children: React.ReactNode
  title: string
  defaultPosition?: WindowPosition
  defaultSize?: WindowSize
  minWidth?: number
  minHeight?: number
}
