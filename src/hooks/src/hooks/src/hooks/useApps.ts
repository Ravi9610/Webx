import { useAppStore } from '@/store/appStore'

export function useApps() {
  const { availableApps, installedApps, installApp, uninstallApp, launchApp } = useAppStore()
  return { availableApps, installedApps, installApp, uninstallApp, launchApp }
}
