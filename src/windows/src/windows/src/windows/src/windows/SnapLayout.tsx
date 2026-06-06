import React, { useState } from 'react'

type SnapZone = 'left' | 'right' | 'top' | 'bottom' | 'center' | null

interface SnapLayoutProps {
  onSnap: (zone: SnapZone) => void
}

const SnapLayout: React.FC<SnapLayoutProps> = ({ onSnap }) => {
  const [hoverZone, setHoverZone] = useState<SnapZone>(null)

  const zones = [
    { id: 'left', position: 'left-0 top-0 w-1/2 h-full', label: 'Left' },
    { id: 'right', position: 'right-0 top-0 w-1/2 h-full', label: 'Right' },
    { id: 'top', position: 'top-0 left-0 w-full h-1/2', label: 'Top' },
    { id: 'bottom', position: 'bottom-0 left-0 w-full h-1/2', label: 'Bottom' },
    { id: 'center', position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3', label: 'Center' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      {zones.map(zone => (
        <div
          key={zone.id}
          className={`${zone.position} pointer-events-auto transition-all duration-150 ${
            hoverZone === zone.id ? 'bg-win11-accent/30 border-2 border-win11-accent' : 'bg-transparent'
          }`}
          onMouseEnter={() => setHoverZone(zone.id as SnapZone)}
          onMouseLeave={() => setHoverZone(null)}
          onClick={() => onSnap(zone.id as SnapZone)}
        />
      ))}
    </div>
  )
}

export default SnapLayout
