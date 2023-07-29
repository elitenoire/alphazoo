import NextLink from 'next/link'
import type { ReactElement } from 'react'
import { useRef, useCallback } from 'react'
import { Flex, Heading, List } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { GalleryRouteModal } from '~components/wiki/GalleryRouteModal'
import { GalleryIcon } from '~components/wiki/GalleryIcon'
import { FixedBackground } from '~components/FixedBackground'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'
import { getStaticProps } from '~@props/wiki'

import type { LayoutProps } from '~components/layout/DefaultLayout'
import { getWikiLayout } from '~components/layout/DefaultLayout'

import type { WikiStaticProps } from '~@props/wiki'

import ImgWiki from '~public/img/bg-wiki.svg'

export default function WikiPage({ gallery }: WikiStaticProps) {
  const lastViewedWikiRef = useRef<HTMLAnchorElement>(null)

  const lastViewedWiki = useGeneralStore.use.lastViewedWiki()

  const syncScroll = useCallback(() => {
    lastViewedWikiRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <GalleryRouteModal gallery={gallery} syncScroll={syncScroll}>
      <Heading as="h1" color="background" textAlign="center">
        Wiki Gallery
      </Heading>
      {gallery ? (
        <List layerStyle="gridy" pt={16}>
          {gallery.map(({ id, name, bgColor, iconUrl }, i) => (
            <MotionPop as="li" key={`${id ?? ''}-${name ?? ''}-${i}`} marge="0px" once>
              <NextLink
                ref={
                  name?.toLowerCase() === (lastViewedWiki?.toLowerCase() ?? null)
                    ? lastViewedWikiRef
                    : null
                }
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

WikiPage.getLayout = (page: ReactElement, props?: LayoutProps) => {
  return getWikiLayout(
    <FixedBackground src={ImgWiki} alt="">
      {page}
    </FixedBackground>,
    props
  )
}

export { getStaticProps }
