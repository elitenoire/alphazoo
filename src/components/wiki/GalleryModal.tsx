import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import { useGeneralStore } from '~src/store'

import { Gallery } from './Gallery'
import { ROUTES } from '~src/constants'

interface GalleryModalProps {
  id: string | null
  gallery: number[]
}

export const GalleryModal = ({ id, gallery }: GalleryModalProps) => {
  const { push } = useRouter()
  const setLastViewedWiki = useGeneralStore.use.setLastViewedWiki()

  const handleClose = useCallback(() => {
    const url = (window.history.state as { url: string }).url
    const searchParams = new URLSearchParams(url.substring(url.indexOf('?')))
    setLastViewedWiki(searchParams.get('id'))

    void push(ROUTES.wiki, undefined, { shallow: true })
  }, [push, setLastViewedWiki])

  return (
    <Modal isOpen={!!id} motionPreset="slideInBottom" onClose={handleClose} size="full">
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        pos="relative"
        overflow="hidden"
        bg="transparent"
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
