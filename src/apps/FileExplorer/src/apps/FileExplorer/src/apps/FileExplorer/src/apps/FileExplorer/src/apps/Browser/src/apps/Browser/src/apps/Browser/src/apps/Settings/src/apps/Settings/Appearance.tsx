import React from 'react'
import { useSettingsStore } from '@/store/settingsStore'
import { useDesktopStore } from '@/store/desktopStore'

const Appearance: React.FC = () => {
  const { theme, accentColor, setTheme, setAccentColor } = useSettingsStore()
  const { wallpaper, setWallpaper } = useDesktopStore()

  const wallpapers = [
    '/wallpapers/default.jpg',
    '/wallpapers/nature.jpg',
    '/wallpapers/abstract.jpg',
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <div className="flex gap-4">
          <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-win11-accent' : 'bg-white/10'}`}>Dark</button>
          <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-win11-accent' : 'bg-white/10'}`}>Light</button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Accent Color</h3>
        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-12 h-12 rounded cursor-pointer" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Wallpaper</h3>
        <div className="flex gap-4">
          {wallpapers.map(w => (
            <button key={w} onClick={() => setWallpaper(w)} className={`w-24 h-16 rounded overflow-hidden border-2 ${wallpaper === w ? 'border-win11-accent' : 'border-transparent'}`}>
              <img src={w} alt="wallpaper" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appearance
