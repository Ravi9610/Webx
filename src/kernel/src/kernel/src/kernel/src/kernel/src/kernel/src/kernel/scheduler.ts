type Task = {
  id: string
  callback: () => void | Promise<void>
  interval?: number
  isRunning: boolean
}

const tasks = new Map<string, Task>()
let intervalIds = new Map<string, number>()

export function scheduleTask(id: string, callback: () => void | Promise<void>, intervalMs?: number) {
  if (tasks.has(id)) {
    unscheduleTask(id)
  }

  const task: Task = { id, callback, interval: intervalMs, isRunning: true }
  tasks.set(id, task)

  if (intervalMs) {
    const intervalId = window.setInterval(() => {
      const t = tasks.get(id)
      if (t && t.isRunning) {
        t.callback()
      }
    }, intervalMs)
    intervalIds.set(id, intervalId)
  } else {
    // Run once
    task.callback()
    tasks.delete(id)
  }
}

export function unscheduleTask(id: string) {
  const task = tasks.get(id)
  if (task) {
    task.isRunning = false
    tasks.delete(id)
  }
  const intervalId = intervalIds.get(id)
  if (intervalId) {
    clearInterval(intervalId)
    intervalIds.delete(id)
  }
}

export function getTasks(): Task[] {
  return Array.from(tasks.values())
}
