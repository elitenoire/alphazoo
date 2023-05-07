import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { useCallback, useEffect } from 'react'
import type { ModalCloseButtonProps } from '@chakra-ui/react'
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react'
import { withSfx } from '~components/sfx'
import { Gallery } from '~components/wiki/Gallery'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'

import type { WikiStaticProps } from '~@props/wiki'

const SfxModalCloseButton = withSfx<ModalCloseButtonProps, HTMLButtonElement>(ModalCloseButton)

interface GalleryRouteModalProps extends Pick<WikiStaticProps, 'gallery'> {
  syncScroll: () => void
}

export const GalleryRouteModal = ({
  syncScroll,
  gallery,
  children,
}: PropsWithChildren<GalleryRouteModalProps>) => {
  const lastViewedWiki = useGeneralStore.use.lastViewedWiki()
  const setLastViewedWiki = useGeneralStore.use.setLastViewedWiki()

  const { push, query } = useRouter()
  const { q } = query

  const _q = typeof q === 'string' ? q.toLowerCase() : null
  const activeIdx = _q && gallery ? gallery.findIndex((g) => g.name?.toLowerCase() === _q) : -1
  const validPathId = activeIdx >= 0 ? _q : null

  const handleClose = useCallback(() => {
    const url = (window.history.state as { url: string }).url
    const searchParams = new URLSearchParams(url.substring(url.indexOf('?')))
    setLastViewedWiki(searchParams.get('g'))

    void push(ROUTES.wiki, undefined, { shallow: true })
  }, [push, setLastViewedWiki])

  useEffect(() => {
    // This effect keeps track of the last viewed wiki in the modal to keep the index page in sync when the user navigates back
    if (lastViewedWiki && !validPathId) {
      syncScroll()
      setLastViewedWiki(null)
    }
  }, [validPathId, lastViewedWiki, setLastViewedWiki, syncScroll])

  return (
    <Box layerStyle="page">
      {children}
      {gallery && (
        <Modal isOpen={!!validPathId} motionPreset="slideInBottom" onClose={handleClose} size="full">
          <ModalOverlay backdropFilter="blur(5px)" />
          <ModalContent
            pos="relative"
            overflow="hidden"
            bg="transparent"
            containerProps={{ zIndex: 'zen' }}
          >
            <SfxModalCloseButton
              zIndex={1}
              top={[1, null, 4]}
              right={[1, null, 10]}
              p={[6, null, 8]}
              rounded={['md', null, 'circle']}
            />
            <ModalBody flex={1} display="flex" px={0} py={0}>
              <Gallery index={activeIdx} gallery={gallery} showIcons />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}
