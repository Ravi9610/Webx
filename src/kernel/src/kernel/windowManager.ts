import { WindowState, WindowPosition, WindowSize } from '@/types/window'
import { useWindowStore } from '@/store/windowStore'

export function openWindow(appId: string, title: string, options?: { size?: WindowSize; position?: WindowPosition }) {
  const store = useWindowStore.getState()
  return store.openWindow(appId, title, options?.size)
}

export function closeWindow(windowId: string) {
  const store = useWindowStore.getState()
  store.closeWindow(windowId)
}

export function minimizeWindow(windowId: string) {
  const store = useWindowStore.getState()
  store.minimizeWindow(windowId)
}

export function maximizeWindow(windowId: string) {
  const store = useWindowStore.getState()
  store.maximizeWindow(windowId)
}

export function restoreWindow(windowId: string) {
  const store = useWindowStore.getState()
  store.restoreWindow(windowId)
}

export function focusWindow(windowId: string) {
  const store = useWindowStore.getState()
  store.focusWindow(windowId)
}

export function getWindows(): WindowState[] {
  return useWindowStore.getState().windows
}
