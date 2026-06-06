import { registerApp } from '@/kernel/appRegistry'
import FileExplorer from './FileExplorer/Explorer'
import Browser from './Browser/Browser'
import Settings from './Settings/Settings'
import AppStore from './Store/AppStore'
import TerminalApp from '@/terminal/TerminalApp'
import Notes from './Notes/Notes'
import Calculator from './Calculator/Calculator'
import Paint from './Paint/Paint'
import MediaPlayer from './MediaPlayer/MediaPlayer'
import Calendar from './Calendar/Calendar'
import AIAssistant from './AIAssistant/AIAssistant'

export function registerAllApps() {
  registerApp({ id: 'file-explorer', name: 'File Explorer', description: '', version: '', author: '', icon: '', isInstalled: true, isSystemApp: true }, FileExplorer)
  registerApp({ id: 'browser', name: 'Web Browser', description: '', version: '', author: '', icon: '', isInstalled: true, isSystemApp: true }, Browser)
  registerApp({ id: 'settings', name: 'Settings', description: '', version: '', author: '', icon: '', isInstalled: true, isSystemApp: true }, Settings)
  registerApp({ id: 'store', name: 'App Store', description: '', version: '', author: '', icon: '', isInstalled: true, isSystemApp: true }, AppStore)
  registerApp({ id: 'terminal', name: 'Terminal', description: '', version: '', author: '', icon: '', isInstalled: true, isSystemApp: true }, TerminalApp)
  registerApp({ id: 'notes', name: 'Notes', description: '', version: '', author: '', icon: '', isInstalled: false, isSystemApp: false }, Notes)
  registerApp({ id: 'calculator', name: 'Calculator', description: '', version: '', author: '', icon: '', isInstalled: false, isSystemApp: false }, Calculator)
  registerApp({ id: 'paint', name: 'Paint', description: '', version: '', author: '', icon: '', isInstalled: false, isSystemApp: false }, Paint)
  registerApp({ id: 'media-player', name: 'Media Player', description: '', version: '', author: '', icon: '', isInstalled: false, isSystemApp: false }, MediaPlayer)
  registerApp({ id: 'calendar', name: 'Calendar', description: '', version: '', author: '', icon: '', isInstalled: false, isSystemApp: false }, Calendar)
  registerApp({ id: 'ai-assistant', name: 'AI Assistant', description: '', version: '', author: '', icon: '', isInstalled: false, isSystemApp: false }, AIAssistant)
}
