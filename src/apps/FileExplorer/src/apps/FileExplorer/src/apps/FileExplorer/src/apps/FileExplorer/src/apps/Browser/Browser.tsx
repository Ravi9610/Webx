import React, { useState, useRef } from 'react'
import Tabs from './Tabs'
import WebView from './WebView'

interface Tab {
  id: string
  title: string
  url: string
}

const Browser: React.FC<{ windowId: string }> = () => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', title: 'New Tab', url: 'https://www.google.com' }])
  const [activeTabId, setActiveTabId] = useState('1')
  const [addressBar, setAddressBar] = useState('https://www.google.com')
  const iframeRefs = useRef<Map<string, HTMLIFrameElement>>(new Map())

  const activeTab = tabs.find(t => t.id === activeTabId)

  const addTab = () => {
    const newId = Date.now().toString()
    setTabs([...tabs, { id: newId, title: 'New Tab', url: 'https://www.google.com' }])
    setActiveTabId(newId)
    setAddressBar('https://www.google.com')
  }

  const closeTab = (id: string) => {
    if (tabs.length === 1) return
    setTabs(tabs.filter(t => t.id !== id))
    if (activeTabId === id) setActiveTabId(tabs[0].id)
  }

  const navigate = (url: string) => {
    let finalUrl = url
    if (!url.startsWith('http')) finalUrl = 'https://' + url
    setAddressBar(finalUrl)
    setTabs(tabs.map(t => t.id === activeTabId ? { ...t, url: finalUrl, title: finalUrl } : t))
    const iframe = iframeRefs.current.get(activeTabId)
    if (iframe) iframe.src = finalUrl
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') navigate(addressBar)
  }

  const updateTitle = (id: string, title: string) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, title } : t))
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs tabs={tabs} activeId={activeTabId} onSelect={setActiveTabId} onClose={closeTab} onAdd={addTab} />
      <div className="flex items-center gap-2 p-2 border-b border-white/10">
        <button onClick={() => navigate(addressBar)} className="p-1 rounded hover:bg-white/10">🔍</button>
        <input
          type="text"
          value={addressBar}
          onChange={(e) => setAddressBar(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-white/10 rounded px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-win11-accent"
        />
      </div>
      <div className="flex-1 relative">
        {tabs.map(tab => (
          <WebView
            key={tab.id}
            id={tab.id}
            url={tab.url}
            isActive={activeTabId === tab.id}
            onTitleChange={(title) => updateTitle(tab.id, title)}
            iframeRef={(ref) => ref && iframeRefs.current.set(tab.id, ref)}
          />
        ))}
      </div>
    </div>
  )
}

export default Browser
