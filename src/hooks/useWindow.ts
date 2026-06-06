import { useWindowStore } from '@/store/windowStore'

export function useWindow(windowId: string) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow } = useWindowStore()
  const window = windows.find(w => w.id === windowId)

  return {
    window,
    close: () => closeWindow(windowId),
    minimize: () => minimizeWindow(windowId),
    maximize: () => maximizeWindow(windowId),
    restore: () => restoreWindow(windowId),
    focus: () => focusWindow(windowId),
  }
}
