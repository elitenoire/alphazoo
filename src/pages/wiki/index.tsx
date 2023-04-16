import type { InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useEffect, useCallback, PropsWithChildren } from 'react'
import { Box, Heading, List } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { GalleryModal } from '~components/wiki/GalleryModal'
import { GalleryIcon } from '~components/wiki/GalleryIcon'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'

import { getWikiLayout } from '~components/layout/DefaultLayout'

type WikiPageProps = InferGetStaticPropsType<typeof getStaticProps>

type GalleryRouterProps = Pick<WikiPageProps, 'gallery'> & {
  syncScroll: () => void
}

const GalleryRouter = ({
  gallery,
  syncScroll,
  children,
}: PropsWithChildren<GalleryRouterProps>) => {
  const lastViewedWiki = useGeneralStore.use.lastViewedWiki()
  const setLastViewedWiki = useGeneralStore.use.setLastViewedWiki()

  const router = useRouter()
  const { id } = router.query
  const validId = typeof id === 'string' ? id : null

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
      <GalleryModal id={validId} gallery={gallery} />
    </Box>
  )
}

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
        {gallery.map((item) => (
          <MotionPop as="li" key={item} once>
            <NextLink
              ref={item === Number(lastViewedWiki) ? lastViewedWikiRef : null}
              href={`${ROUTES.wiki}?id=${item}`}
              as={`${ROUTES.wiki}/${item}`}
              shallow
            >
              <GalleryIcon icon={item} />
            </NextLink>
          </MotionPop>
        ))}
      </List>
    </GalleryRouter>
  )
}

WikiPage.getLayout = getWikiLayout

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const gallery = Array.from({ length: 80 }, (x, i) => i)

  return { props: { gallery } }
}
