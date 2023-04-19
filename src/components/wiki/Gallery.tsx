import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import useKeypress from 'react-use-keypress'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { Box, List, ListItem, Flex } from '@chakra-ui/react'
import { ArrowLeft1Linear, ArrowRight1Linear } from 'react-iconsax-icons'
import { GalleryImage } from './GalleryImage'
import { GalleryIcon } from './GalleryIcon'
import { GalleryButton } from './GalleryButton'
import { range } from '~src/utils'
import { ROUTES } from '~src/constants'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

interface GalleryProps {
  id: string | null
  gallery?: number[]
  dynamicWiki?: number
  total?: number
  showIcons?: boolean
}

export const Gallery = ({ id, gallery, total, dynamicWiki, showIcons }: GalleryProps) => {
  const [direction, setDirection] = useState(0)
  const [selected, setSelected] = useState(Number(id))
  const { push, prefetch } = useRouter()

  const galleryCount = gallery?.length ?? total
  const allowPrev = selected > 0
  const allowNext = galleryCount && selected + 1 < galleryCount

  const changeWikiId = useCallback(
    (newVal: number) => {
      setDirection(newVal > selected ? 1 : -1)
      setSelected(newVal)

      if (showIcons) {
        const newUrl = `${ROUTES.wiki}?id=${newVal}`
        const asUrl = `${ROUTES.wiki}/${newVal}`
        window.history.replaceState({ ...window.history.state, as: asUrl, url: newUrl }, '', asUrl)
      } else {
        void push(`${ROUTES.wiki}/${newVal}`)
      }
    },
    [push, showIcons, selected]
  )

  const prev = useCallback(() => {
    if (allowPrev) {
      changeWikiId(selected - 1)
    }
  }, [changeWikiId, selected, allowPrev])

  const next = useCallback(() => {
    if (allowNext) {
      changeWikiId(selected + 1)
    }
  }, [changeWikiId, selected, allowNext])

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  })

  const navigate = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        next()
      } else if (event.key === 'ArrowLeft') {
        prev()
      }
    },
    [next, prev]
  )

  useKeypress(['ArrowRight', 'ArrowLeft'], navigate)

  // prefetch prev / next routes for dynamic routes
  useEffect(() => {
    if (!showIcons) {
      //prev
      if (allowPrev) {
        void prefetch(`${ROUTES.wiki}/${selected - 1}`)
      }
      // next
      if (allowNext) {
        void prefetch(`${ROUTES.wiki}/${selected + 1}`)
      }
    }
  }, [showIcons, prefetch, selected, allowPrev, allowNext])

  const filtered = gallery?.filter((wiki) => range(selected - 10, selected + 10).includes(wiki))
  // wiki either from modal or dynamic page
  const currentWiki = gallery ? gallery[selected] : dynamicWiki

  return (
    <Flex
      pos="relative"
      justify="center"
      direction="column"
      flex={1}
      rowGap={1}
      w="full"
      {...(showIcons && {
        pt: [0, null, 1],
        pb: 1,
        px: [0, null, 6],
      })}
      {...handlers}
    >
      <MotionConfig
        transition={{
          default: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
          opacity: { duration: 0.2 },
        }}
      >
        <GalleryImage rounded={showIcons} />
        {allowPrev && (
          <GalleryButton
            left={1}
            icon={<ArrowLeft1Linear color="currentColor" size="35%" />}
            title="Previous"
            onClick={prev}
          />
        )}
        {allowNext && (
          <GalleryButton
            right={1}
            icon={<ArrowRight1Linear color="currentColor" size="35%" />}
            title="Next"
            onClick={next}
          />
        )}
        {showIcons && (
          <Box w="full">
            <MotionList
              initial={false}
              sx={{ aspectRatio: '1' }}
              columnGap={0}
              display="flex"
              h={20}
              minH="10dvh"
              mx="auto"
            >
              <AnimatePresence initial={false}>
                {filtered?.map((g) => (
                  <MotionListItem
                    key={g}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                    initial={{
                      width: '0%',
                      x: `${Math.max((selected - 1) * -100, 10 * -100)}%`,
                    }}
                    animate={{
                      scale: g === selected ? 1.125 : 1,
                      width: '100%',
                      x: `${Math.max(selected * -100, 10 * -100)}%`,
                    }}
                    exit={{ width: '0%' }}
                    onClick={() => changeWikiId(g)}
                  >
                    <Box as="button" boxSize="90%" appearance="none">
                      <GalleryIcon />
                    </Box>
                  </MotionListItem>
                ))}
              </AnimatePresence>
            </MotionList>
          </Box>
        )}
      </MotionConfig>
    </Flex>
  )
}
