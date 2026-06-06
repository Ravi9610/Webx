import React, { useState } from 'react'
import { useAppStore } from '@/store/appStore'

const InstallButton: React.FC<{ appId: string }> = ({ appId }) => {
  const { installApp, uninstallApp, availableApps } = useAppStore()
  const app = availableApps.find(a => a.id === appId)
  const [installing, setInstalling] = useState(false)

  const handleClick = async () => {
    setInstalling(true)
    if (app?.isInstalled) await uninstallApp(appId)
    else await installApp(appId)
    setInstalling(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={installing}
      className={`px-3 py-1 rounded text-sm transition-colors ${app?.isInstalled ? 'bg-red-500/80 hover:bg-red-600' : 'bg-win11-accent hover:bg-win11-accent-hover'} disabled:opacity-50`}
    >
      {installing ? '...' : (app?.isInstalled ? 'Uninstall' : 'Install')}
    </button>
  )
}

export default InstallButton
