import { App } from '@/types/app'
import { openWindow } from './windowManager'
import { createProcess } from './processManager'

const appComponents = new Map<string, React.ComponentType<any>>()

export function registerApp(app: App, component: React.ComponentType<any>) {
  appComponents.set(app.id, component)
}

export function getAppComponent(appId: string): React.ComponentType<any> | undefined {
  return appComponents.get(appId)
}

export function launchApp(appId: string, props?: any) {
  const component = appComponents.get(appId)
  if (!component) {
    console.error(`App ${appId} not registered`)
    return
  }

  const windowId = openWindow(appId, getAppTitle(appId))
  createProcess(appId, getAppTitle(appId), windowId)

  // Dispatch event for app to render
  window.dispatchEvent(new CustomEvent('app-launched', { detail: { appId, windowId, props } }))
}

function getAppTitle(appId: string): string {
  const titles: Record<string, string> = {
    'file-explorer': 'File Explorer',
    browser: 'Web Browser',
    settings: 'Settings',
    store: 'App Store',
    terminal: 'Terminal',
    notes: 'Notes',
    calculator: 'Calculator',
    paint: 'Paint',
    'media-player': 'Media Player',
    calendar: 'Calendar',
    'ai-assistant': 'AI Assistant',
  }
  return titles[appId] || appId
}
