import type { ReactNode } from 'react'
import MenuBar from './MenuBar'

interface HeaderProps {
  children: ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <header>
      <MenuBar />
      {children}
    </header>
  )
}
