import NextImage from 'next/image'
import { motion } from 'framer-motion'
import type { ListProps, ListItemProps, AspectRatioProps } from '@chakra-ui/react'
import { Box, Heading, List, ListItem, AspectRatio } from '@chakra-ui/react'
import { GalleryModal } from '~/src/components/wiki/GalleryModal'

import { getWikiLayout } from '~components/layout/DefaultLayout'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)
const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

const gallery = Array.from({ length: 50 }, (x, i) => i)

export default function Wiki() {
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
          <Box key={item} bg="white" rounded="icon">
            <AspectRatio ratio={1}>
              <Box>{item}</Box>
            </AspectRatio>
          </Box>
        ))}
      </MotionList>
      <GalleryModal />
    </Box>
  )
}

Wiki.getLayout = getWikiLayout
