import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import type { ListItemProps } from '@chakra-ui/react'
import { Box, List, ListItem, Flex } from '@chakra-ui/react'
import { NavButton } from '~components/NavButton'
import { GalleryImage } from '~components/wiki/GalleryImage'
import { GalleryIcon } from '~components/wiki/GalleryIcon'
import { range } from '~src/utils'
import { ROUTES } from '~src/constants'
import { useGestureNavigation } from '~src/hooks/useGestureNavigation'

import type { WikiStaticProps, TGalleryWiki } from '~@props/wiki'

const MotionListItem = motion<ListItemProps>(ListItem)

type TFilteredGallery = readonly [TGalleryWiki, number]

interface GalleryProps extends WikiStaticProps {
  index: number
  showIcons?: boolean
  prevId?: string
  nextId?: string
}

export const Gallery = ({ index, gallery, prevId, nextId, showIcons }: GalleryProps) => {
  const [activeIdx, setActiveIdx] = useState(index)

  const { push } = useRouter()

  const _prevId = gallery ? gallery[activeIdx - 1]?.name : null
  const _nextId = gallery ? gallery[activeIdx + 1]?.name : null

  const PREV_PATH_ID = showIcons ? _prevId : prevId
  const NEXT_PATH_ID = showIcons ? _nextId : nextId

  const allowPrev = !!_prevId || !!prevId
  const allowNext = !!_nextId || !!nextId

  const changeId = useCallback(
    (dir: 1 | -1, pathId?: string, newIdx?: number) => {
      if (!pathId) return

      setActiveIdx((idx) => (showIcons ? newIdx ?? idx + dir : 0))

      if (showIcons) {
        const newUrl = `${ROUTES.wiki}?id=${pathId}`
        const asUrl = `${ROUTES.wiki}/${pathId}`
        window.history.replaceState({ ...window.history.state, as: asUrl, url: newUrl }, '', asUrl)
      } else {
        void push(`${ROUTES.wiki}/${pathId}`)
      }
    },
    [push, showIcons]
  )

  const prev = useCallback(() => {
    if (allowPrev) {
      changeId(-1, PREV_PATH_ID!)
    }
  }, [allowPrev, changeId, PREV_PATH_ID])

  const next = useCallback(() => {
    if (allowNext) {
      changeId(1, NEXT_PATH_ID!)
    }
  }, [allowNext, changeId, NEXT_PATH_ID])

  const goto = useCallback(
    (idx: number, dir: 1 | -1, pathId?: string) => () => {
      changeId(dir, pathId, idx)
    },
    [changeId]
  )

  const handlers = useGestureNavigation({
    prev,
    next,
    allowPrefetch: !showIcons,
    ...(prevId && { prevUrl: `${ROUTES.wiki}/${prevId}` }),
    ...(nextId && { nextUrl: `${ROUTES.wiki}/${nextId}` }),
  })

  const filterRange = showIcons ? range(activeIdx - 10, activeIdx + 10) : [activeIdx]

  const filtered = gallery?.reduce<TFilteredGallery[]>((_filtered, g, i) => {
    if (filterRange.includes(i)) {
      _filtered.push([g, i])
    }
    return _filtered
  }, [])

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
      <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
        <GalleryImage rounded={showIcons} wiki={gallery?.[activeIdx]} />
        {allowPrev && (
          <NavButton
            prev
            title={`Previous${PREV_PATH_ID ? ' : ' + PREV_PATH_ID.toUpperCase() : ''}`}
            onClick={prev}
          />
        )}
        {allowNext && (
          <NavButton
            title={`Next${NEXT_PATH_ID ? ' : ' + NEXT_PATH_ID.toUpperCase() : ''}`}
            onClick={next}
          />
        )}
        {showIcons && (
          <Box w="full">
            <List
              sx={{ aspectRatio: '1' }}
              columnGap={0}
              display="flex"
              h={20}
              minH="10dvh"
              mx="auto"
            >
              <AnimatePresence initial={false}>
                {filtered?.map(([{ name, iconUrl, bgColor }, fIdx]) => (
                  <MotionListItem
                    key={fIdx}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                    initial={{
                      width: '0%',
                      x: `${Math.max((activeIdx - 1) * -100, 10 * -100)}%`,
                    }}
                    animate={{
                      scale: fIdx === activeIdx ? 1.125 : 1,
                      width: '100%',
                      x: `${Math.max(activeIdx * -100, 10 * -100)}%`,
                    }}
                    exit={{ width: '0%' }}
                    onClick={goto(fIdx, fIdx > activeIdx ? 1 : -1, name)}
                  >
                    <Box as="button" boxSize="90%" appearance="none">
                      <GalleryIcon src={iconUrl} bg={bgColor} />
                    </Box>
                  </MotionListItem>
                ))}
              </AnimatePresence>
            </List>
          </Box>
        )}
      </MotionConfig>
    </Flex>
  )
}
