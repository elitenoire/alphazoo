import type { PropsWithChildren } from 'react'
import SiteMenu from './SiteMenu'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <header>
      <SiteMenu />
      {children}
    </header>
  )
}
