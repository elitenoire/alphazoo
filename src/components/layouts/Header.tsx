import type { ReactNode } from 'react'
import SiteMenu from './SiteMenu'

interface HeaderProps {
  children: ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <header>
      <SiteMenu />
      {children}
    </header>
  )
}
