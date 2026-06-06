type EventCallback = (data: any) => void

const eventBus = new Map<string, EventCallback[]>()

export function on(event: string, callback: EventCallback) {
  if (!eventBus.has(event)) {
    eventBus.set(event, [])
  }
  eventBus.get(event)!.push(callback)

  return () => {
    const callbacks = eventBus.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index !== -1) callbacks.splice(index, 1)
    }
  }
}

export function emit(event: string, data: any) {
  const callbacks = eventBus.get(event)
  if (callbacks) {
    callbacks.forEach(cb => cb(data))
  }
}

export function once(event: string, callback: EventCallback) {
  const unsubscribe = on(event, (data) => {
    unsubscribe()
    callback(data)
  })
}
