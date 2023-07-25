import type { PropsWithChildren } from 'react'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { Gallery } from '~components/wiki/Gallery'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'
import { GalleryModal } from './GalleryModal'

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
        <GalleryModal
          isOpen={!!validPathId}
          motionPreset="slideInBottom"
          onClose={handleClose}
          size="full"
        >
          <Gallery index={activeIdx} gallery={gallery} showIcons />
        </GalleryModal>
      )}
    </Box>
  )
}
