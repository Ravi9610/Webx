export interface Permission {
  name: string
  description: string
}

export const Permissions = {
  READ_FILES: { name: 'read_files', description: 'Read files from the file system' },
  WRITE_FILES: { name: 'write_files', description: 'Write files to the file system' },
  DELETE_FILES: { name: 'delete_files', description: 'Delete files from the file system' },
  ACCESS_NETWORK: { name: 'access_network', description: 'Access the network' },
  NOTIFICATIONS: { name: 'notifications', description: 'Send notifications' },
  CAMERA: { name: 'camera', description: 'Access camera' },
  MICROPHONE: { name: 'microphone', description: 'Access microphone' },
}

const grantedPermissions = new Map<string, Set<string>>()

export function requestPermission(appId: string, permission: Permission): Promise<boolean> {
  return new Promise((resolve) => {
    // In a real system, show a dialog to the user
    // For now, auto-grant
    if (!grantedPermissions.has(appId)) {
      grantedPermissions.set(appId, new Set())
    }
    grantedPermissions.get(appId)!.add(permission.name)
    resolve(true)
  })
}

export function hasPermission(appId: string, permission: Permission): boolean {
  const perms = grantedPermissions.get(appId)
  return perms?.has(permission.name) || false
}

export function revokePermission(appId: string, permission: Permission) {
  const perms = grantedPermissions.get(appId)
  if (perms) {
    perms.delete(permission.name)
  }
}
