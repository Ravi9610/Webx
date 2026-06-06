import React, { useEffect } from 'react'

interface WebViewProps {
  id: string
  url: string
  isActive: boolean
  onTitleChange: (title: string) => void
  iframeRef: (ref: HTMLIFrameElement | null) => void
}

const WebView: React.FC<WebViewProps> = ({ id, url, isActive, onTitleChange, iframeRef }) => {
  useEffect(() => {
    if (isActive) {
      // Could listen to iframe title changes via postMessage if allowed
    }
  }, [isActive])

  return (
    <iframe
      ref={iframeRef}
      src={url}
      title={`browser-${id}`}
      className={`absolute inset-0 w-full h-full border-0 ${isActive ? 'visible' : 'invisible'}`}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    />
  )
}

export default WebView
