import { useState, useCallback, ReactNode } from 'react'
import { ModalContextProvider, useModal } from '@chakra-ui/react'

interface SiteMenuProviderProps {
  children: ReactNode
}

export const SiteMenuProvider = ({ children }: SiteMenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((_open) => !_open)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const modal = useModal({
    // id,
    isOpen,
    onClose,
    closeOnOverlayClick: false,
    // onEsc
  })

  const context = {
    ...modal,
    toggleOpen,
    trapFocus: isOpen,
    blockScrollOnMount: isOpen,
    // initialFocusRef,
    // finalFocusRef,
    autoFocus: true,
    returnFocusOnClose: true,
    allowPinchZoom: false,
    lockFocusAcrossFrames: true,
    preserveScrollBarGap: false,
    // onCloseComplete,
  }

  return <ModalContextProvider value={context}>{children}</ModalContextProvider>
}
