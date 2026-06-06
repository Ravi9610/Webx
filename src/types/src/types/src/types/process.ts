export interface Process {
  id: string
  appId: string
  name: string
  pid: number
  status: 'running' | 'stopped' | 'crashed'
  startTime: Date
  memoryUsage: number
  windowId?: string
}

export interface ProcessEvent {
  type: 'start' | 'stop' | 'crash' | 'error'
  processId: string
  timestamp: Date
  data?: any
}
