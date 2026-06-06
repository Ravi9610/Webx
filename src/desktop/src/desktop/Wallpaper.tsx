import React from 'react'
import { useDesktopStore } from '@/store/desktopStore'

const Wallpaper: React.FC = () => {
  const { wallpaper } = useDesktopStore()

  return (
    <div 
      className="fixed inset-0 -z-10 bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}

export default Wallpaper
