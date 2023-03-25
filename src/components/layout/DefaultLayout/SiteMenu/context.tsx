import type { PropsWithChildren } from 'react'
import { useState, useCallback } from 'react'
import { ModalContextProvider, useModal } from '@chakra-ui/react'

export const SiteMenuProvider = ({ children }: PropsWithChildren) => {
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
