export interface App {
  id: string
  name: string
  description: string
  version: string
  author: string
  icon: string
  isInstalled: boolean
  isSystemApp: boolean
  installDate?: Date
  permissions?: string[]
  component?: React.ComponentType<any>
}

export interface AppManifest {
  id: string
  name: string
  version: string
  entryPoint: string
  permissions: string[]
}
