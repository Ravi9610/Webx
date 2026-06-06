import { useDesktopStore } from '@/store/desktopStore'

export function useDesktop() {
  const { icons, wallpaper, addIcon, removeIcon, updateIconPosition, setWallpaper } = useDesktopStore()
  return { icons, wallpaper, addIcon, removeIcon, updateIconPosition, setWallpaper }
}
