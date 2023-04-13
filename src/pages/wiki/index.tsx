import type { InferGetStaticPropsType } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { ListProps, ListItemProps, AspectRatioProps } from '@chakra-ui/react'
import { Box, Heading, List, ListItem, AspectRatio } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { GalleryModal } from '~components/wiki/GalleryModal'
import { GalleryIcon } from '~components/wiki/GalleryIcon'
import { ROUTES } from '~/src/constants'

import { getWikiLayout } from '~components/layout/DefaultLayout'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)
const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

export default function Wiki({ gallery }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { id } = router.query
  // const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  // const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  // const handleClose = useCallback(() => {
  //   setLastViewedPhoto(id)
  // }, [id])

  const handleClose = () => ({})

  // useEffect(() => {
  //   // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
  //   if (lastViewedPhoto && !id) {
  //     lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
  //     setLastViewedPhoto(null)
  //   }
  // }, [id, lastViewedPhoto, setLastViewedPhoto])

  return (
    <Box layerStyle="page">
      <Heading as="h1" color="brand.50" textAlign="center">
        Wiki Gallery
      </Heading>
      <MotionList
        display="grid"
        sx={{
          '--gap': '1.5vw',
          '--size': '8em',
          '--max-column': '6',
        }}
        placeContent="center"
        pt={16}
        gap="var(--gap)"
        gridTemplateColumns="repeat(auto-fit, minmax(min(max(100% / var(--max-column) - var(--gap), var(--size)), 100%),1fr))"
      >
        {gallery.map((item) => (
          <MotionPop as="li" key={item} once>
            <NextLink
              // ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              href={`${ROUTES.wiki}?id=${item}`}
              as={`${ROUTES.wiki}/${item}`}
              shallow
            >
              <GalleryIcon icon={item} />
            </NextLink>
          </MotionPop>
        ))}
      </MotionList>
      <GalleryModal gallery={gallery} onClose={handleClose} />
    </Box>
  )
}

Wiki.getLayout = getWikiLayout

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const gallery = Array.from({ length: 80 }, (x, i) => i)

  return { props: { gallery } }
}
