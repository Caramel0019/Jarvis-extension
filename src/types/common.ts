export interface Route {
  path: string
  component: React.ComponentType
  title: string
  icon?: string
}

export type ThemeMode = 'light' | 'dark' | 'system'