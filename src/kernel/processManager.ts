import { Process, ProcessEvent } from '@/types/process'

let processes: Process[] = []
let nextPid = 1
const eventListeners: ((event: ProcessEvent) => void)[] = []

export function createProcess(appId: string, name: string, windowId?: string): Process {
  const process: Process = {
    id: `proc-${Date.now()}-${Math.random()}`,
    appId,
    name,
    pid: nextPid++,
    status: 'running',
    startTime: new Date(),
    memoryUsage: 0,
    windowId,
  }
  processes.push(process)
  emitEvent({ type: 'start', processId: process.id, timestamp: new Date(), data: process })
  return process
}

export function killProcess(processId: string) {
  const index = processes.findIndex(p => p.id === processId)
  if (index !== -1) {
    const process = processes[index]
    process.status = 'stopped'
    processes.splice(index, 1)
    emitEvent({ type: 'stop', processId, timestamp: new Date(), data: process })
  }
}

export function getProcesses(): Process[] {
  return [...processes]
}

export function getProcessByWindowId(windowId: string): Process | undefined {
  return processes.find(p => p.windowId === windowId)
}

export function onProcessEvent(callback: (event: ProcessEvent) => void) {
  eventListeners.push(callback)
  return () => {
    const index = eventListeners.indexOf(callback)
    if (index !== -1) eventListeners.splice(index, 1)
  }
}

function emitEvent(event: ProcessEvent) {
  eventListeners.forEach(listener => listener(event))
}
