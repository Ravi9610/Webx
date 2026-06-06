import React, { useState, useEffect } from 'react'
import { Bell, X, Calendar, MessageSquare } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationCenterProps {
  onClose: () => void
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'System Update', message: 'WebOS is up to date', timestamp: new Date(), read: false },
    { id: '2', title: 'New App Available', message: 'AI Assistant is ready to install', timestamp: new Date(), read: false },
  ])

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed bottom-12 right-2 z-50 win11-start-menu w-[400px] h-[500px] overflow-hidden animate-slide-up">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <button onClick={clearAll} className="text-xs opacity-70 hover:opacity-100">Clear all</button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
              <Bell size={48} />
              <p className="mt-2">No notifications</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${notif.read ? 'opacity-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{notif.title}</h4>
                  <span className="text-xs opacity-50">{notif.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-sm opacity-70 mt-1">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default NotificationCenter
