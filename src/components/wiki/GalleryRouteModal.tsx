import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'
import { useCallback, useEffect } from 'react'
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useGeneralStore } from '~src/store'

import { Gallery } from './Gallery'
import { ROUTES } from '~src/constants'

import type { WikiStaticProps } from '~@props/wiki'

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
  const selected = _q && gallery ? gallery.findIndex((g) => g.name?.toLowerCase() === _q) : -1
  const validId = selected >= 0 ? _q : null

  const handleClose = useCallback(() => {
    const url = (window.history.state as { url: string }).url
    const searchParams = new URLSearchParams(url.substring(url.indexOf('?')))
    setLastViewedWiki(searchParams.get('g'))

    void push(ROUTES.wiki, undefined, { shallow: true })
  }, [push, setLastViewedWiki])

  useEffect(() => {
    // This effect keeps track of the last viewed wiki in the modal to keep the index page in sync when the user navigates back
    if (lastViewedWiki && !validId) {
      syncScroll()
      setLastViewedWiki(null)
    }
  }, [validId, lastViewedWiki, setLastViewedWiki, syncScroll])

  return (
    <Box layerStyle="page">
      {children}
      {gallery && (
        <Modal isOpen={!!validId} motionPreset="slideInBottom" onClose={handleClose} size="full">
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
              <Gallery id={selected} gallery={gallery} showIcons />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  )
}
