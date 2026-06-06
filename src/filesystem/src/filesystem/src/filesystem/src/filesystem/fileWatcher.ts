type WatcherCallback = (event: 'add' | 'change' | 'delete', path: string) => void

const watchers = new Map<string, WatcherCallback[]>()

export function watchPath(path: string, callback: WatcherCallback) {
  if (!watchers.has(path)) {
    watchers.set(path, [])
  }
  watchers.get(path)!.push(callback)

  return () => {
    const callbacks = watchers.get(path)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index !== -1) callbacks.splice(index, 1)
    }
  }
}

export function notifyWatchers(event: 'add' | 'change' | 'delete', path: string) {
  for (const [watchedPath, callbacks] of watchers) {
    if (path.startsWith(watchedPath)) {
      callbacks.forEach(cb => cb(event, path))
    }
  }
}
