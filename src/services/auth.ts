export interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

let currentUser: User | null = null

export async function login(username: string, password: string): Promise<User> {
  // Mock login
  currentUser = { id: '1', username, email: `${username}@webos.local` }
  localStorage.setItem('user', JSON.stringify(currentUser))
  return currentUser
}

export async function logout(): Promise<void> {
  currentUser = null
  localStorage.removeItem('user')
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser
  const stored = localStorage.getItem('user')
  if (stored) currentUser = JSON.parse(stored)
  return currentUser
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
