import type { PropsWithChildren } from 'react'
import { ModalFocusScope, useModalContext } from '@chakra-ui/react'
import MenuBar from './MenuBar'
import Menu from './Menu'
import { SiteMenuProvider } from './context'

const FocusGuard = ({ children }: PropsWithChildren) => {
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
