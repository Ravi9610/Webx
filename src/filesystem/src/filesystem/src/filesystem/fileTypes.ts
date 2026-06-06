export interface FileTypeInfo {
  extension: string
  icon: string
  name: string
  mimeType: string
}

export const fileTypes: Record<string, FileTypeInfo> = {
  txt: { extension: 'txt', icon: '📄', name: 'Text Document', mimeType: 'text/plain' },
  json: { extension: 'json', icon: '📋', name: 'JSON File', mimeType: 'application/json' },
  js: { extension: 'js', icon: '📜', name: 'JavaScript File', mimeType: 'application/javascript' },
  html: { extension: 'html', icon: '🌐', name: 'HTML Document', mimeType: 'text/html' },
  css: { extension: 'css', icon: '🎨', name: 'CSS File', mimeType: 'text/css' },
  png: { extension: 'png', icon: '🖼️', name: 'PNG Image', mimeType: 'image/png' },
  jpg: { extension: 'jpg', icon: '🖼️', name: 'JPEG Image', mimeType: 'image/jpeg' },
  jpeg: { extension: 'jpeg', icon: '🖼️', name: 'JPEG Image', mimeType: 'image/jpeg' },
  gif: { extension: 'gif', icon: '🎞️', name: 'GIF Image', mimeType: 'image/gif' },
  mp3: { extension: 'mp3', icon: '🎵', name: 'MP3 Audio', mimeType: 'audio/mpeg' },
  mp4: { extension: 'mp4', icon: '🎬', name: 'MP4 Video', mimeType: 'video/mp4' },
  pdf: { extension: 'pdf', icon: '📑', name: 'PDF Document', mimeType: 'application/pdf' },
  folder: { extension: '', icon: '📁', name: 'Folder', mimeType: '' },
}

export function getFileTypeInfo(filename: string): FileTypeInfo {
  const extension = filename.split('.').pop()?.toLowerCase()
  if (!extension) return fileTypes.folder
  return fileTypes[extension] || { extension, icon: '📄', name: 'File', mimeType: 'application/octet-stream' }
}
