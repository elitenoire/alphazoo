import NextLink from 'next/link'
import { useRef, useCallback } from 'react'
import { Flex, Heading, List } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { GalleryRouteModal } from '~components/wiki/GalleryRouteModal'
import { GalleryIcon } from '~components/wiki/GalleryIcon'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'
import { getStaticProps } from '~@props/wiki'

import { getWikiLayout } from '~components/layout/DefaultLayout'

import type { WikiStaticProps } from '~@props/wiki'

export default function WikiPage({ gallery }: WikiStaticProps) {
  const lastViewedWikiRef = useRef<HTMLAnchorElement>(null)

  const lastViewedWiki = useGeneralStore.use.lastViewedWiki()

  const syncScroll = useCallback(() => {
    lastViewedWikiRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <GalleryRouteModal gallery={gallery} syncScroll={syncScroll}>
      <Heading as="h1" color="brand.50" textAlign="center">
        Wiki Gallery
      </Heading>
      {gallery ? (
        <List
          sx={{
            '--gap': '1.5vw',
            '--size': '8em',
            '--max-column': '6',
          }}
          gap="var(--gap)"
          gridTemplateColumns="repeat(auto-fit, minmax(min(max(100% / var(--max-column) - var(--gap), var(--size)), 100%),1fr))"
          display="grid"
          pt={16}
          placeContent="center"
        >
          {gallery.map(({ id, name, bgColor, iconUrl }, i) => (
            <MotionPop as="li" key={`${id}-${name}-${i}`} marge="0px" once>
              <NextLink
                ref={name?.toLowerCase() === (lastViewedWiki?.toLowerCase() ?? null) ? lastViewedWikiRef : null}
                href={`${ROUTES.wiki}?q=${name?.toLowerCase() ?? ''}`}
                as={`${ROUTES.wiki}/${name?.toLowerCase() ?? ''}`}
                shallow
              >
                <GalleryIcon src={iconUrl} title={name} bg={bgColor} />
              </NextLink>
            </MotionPop>
          ))}
        </List>
      ) : (
        <Flex>Gallery currently unavailable...</Flex>
      )}
    </GalleryRouteModal>
  )
}

WikiPage.getLayout = getWikiLayout

export { getStaticProps }
