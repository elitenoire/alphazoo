import type { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { useRef, useCallback } from 'react'
import { Heading, List } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { GalleryRouter } from '~components/wiki/GalleryRouter'
import { GalleryIcon } from '~components/wiki/GalleryIcon'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'
import { getStaticProps } from '~@props/wiki'

import { getWikiLayout } from '~components/layout/DefaultLayout'

type WikiPageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function WikiPage({ gallery }: WikiPageProps) {
  const lastViewedWikiRef = useRef<HTMLAnchorElement>(null)

  const lastViewedWiki = useGeneralStore.use.lastViewedWiki()

  const syncScroll = useCallback(() => {
    lastViewedWikiRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <GalleryRouter gallery={gallery} syncScroll={syncScroll}>
      <Heading as="h1" color="brand.50" textAlign="center">
        Wiki Gallery
      </Heading>
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
        {gallery.map(({ name, bgColor, iconUrl }) => (
          <MotionPop as="li" key={name} marge="0px" once>
            <NextLink
              ref={name === lastViewedWiki ? lastViewedWikiRef : null}
              href={`${ROUTES.wiki}?id=${name}`}
              as={`${ROUTES.wiki}/${name}`}
              shallow
            >
              <GalleryIcon src={iconUrl} title={name} bg={bgColor} />
            </NextLink>
          </MotionPop>
        ))}
      </List>
    </GalleryRouter>
  )
}

WikiPage.getLayout = getWikiLayout

export { getStaticProps }
