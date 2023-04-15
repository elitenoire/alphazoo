import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Modal, ModalBody, ModalContent, ModalCloseButton } from '@chakra-ui/react'
import { Gallery } from './Gallery'
import { ROUTES } from '~src/constants'

interface GalleryModalProps {
  id: string | null
  gallery: number[]
  onClose: () => void
}

export const GalleryModal = ({ id, gallery, onClose }: GalleryModalProps) => {
  const { push } = useRouter()

  const handleClose = useCallback(() => {
    void push(ROUTES.wiki, undefined, { shallow: true })
    onClose()
  }, [onClose, push])

  return (
    <Modal isOpen motionPreset="none" onClose={handleClose} size="full">
      <ModalContent
        pos="relative"
        overflow="hidden"
        bg="blackAlpha.700"
        backdropFilter="blur(5px)"
        containerProps={{ zIndex: 'zen' }}
      >
        <ModalCloseButton
          zIndex={1}
          top={[1, null, 4]}
          right={[1, null, 10]}
          p={[6, null, 8]}
          rounded={['md', null, 'circle']}
        />
        <ModalBody flex={1} display="flex" px={0} py={0}>
          <Gallery id={id} gallery={gallery} showIcons />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
