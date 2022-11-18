import type { ReactNode } from 'react'
import { ModalFocusScope, useModalContext } from '@chakra-ui/react'
import MenuBar from '~/src/components/layouts/SiteMenu/MenuBar'
import { SiteMenuProvider } from './context'
import { Menu } from './Menu'

interface FocusGuardProps {
  children: ReactNode
}

const FocusGuard = ({ children }: FocusGuardProps) => {
  const { getDialogContainerProps } = useModalContext()
  const containerProps = getDialogContainerProps()

  return (
    <ModalFocusScope>
      <div {...containerProps} tabIndex={-1}>
        {children}
      </div>
    </ModalFocusScope>
  )
}

export default function SiteMenu() {
  return (
    <SiteMenuProvider>
      <FocusGuard>
        <MenuBar />
        <Menu />
      </FocusGuard>
    </SiteMenuProvider>
  )
}
