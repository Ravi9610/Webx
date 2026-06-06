import React, { useEffect, useState } from 'react'
import { getStorageUsage, formatBytes } from '@/filesystem/storage'

const Storage: React.FC = () => {
  const [usage, setUsage] = useState({ used: 0, total: 0, percentage: 0 })

  useEffect(() => {
    getStorageUsage().then(setUsage)
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Storage Usage</h3>
      <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
        <div className="bg-win11-accent h-full transition-all duration-500" style={{ width: `${usage.percentage}%` }} />
      </div>
      <p>{formatBytes(usage.used)} used of {formatBytes(usage.total)}</p>
    </div>
  )
}

export default Storage
