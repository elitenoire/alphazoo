import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { Box, List, ListItem, Flex } from '@chakra-ui/react'
import { NavButton } from '~components/NavButton'
import { GalleryImage } from './GalleryImage'
import { GalleryIcon } from './GalleryIcon'
import { range } from '~src/utils'
import { ROUTES } from '~src/constants'
import { useGestureNavigation } from '~src/hooks/useGestureNavigation'

import type { WikiStaticProps, TGalleryWiki } from '~@props/wiki'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

type TFilteredGallery = readonly [TGalleryWiki, number]

interface GalleryProps extends WikiStaticProps {
  id: number
  showIcons?: boolean
  prevId?: string
  nextId?: string
}

export const Gallery = ({
  id,
  gallery,
  prevId,
  nextId,
  showIcons,
}: GalleryProps) => {
  const [direction, setDirection] = useState(0)
  const [selected, setSelected] = useState(id)

  const { push } = useRouter()

  const _prevId = gallery ? gallery[selected - 1]?.name : null
  const _nextId = gallery ? gallery[selected + 1]?.name : null

  const PREV_ID = showIcons ? _prevId : prevId
  const NEXT_ID = showIcons ? _nextId : nextId

  const allowPrev = !!_prevId || !!prevId
  const allowNext = !!_nextId || !!nextId

  const changeId = useCallback(
    (dir: 1 | -1, id?: string, fid?: number) => {
      if (!id) return

      setDirection(dir)
      setSelected((s) => (showIcons ? (fid ?? s + dir) : 0))

      if (showIcons) {
        const newUrl = `${ROUTES.wiki}?id=${id}`
        const asUrl = `${ROUTES.wiki}/${id}`
        window.history.replaceState({ ...window.history.state, as: asUrl, url: newUrl }, '', asUrl)
      } else {
        void push(`${ROUTES.wiki}/${id}`)
      }
    },
    [push, showIcons]
  )

  const prev = useCallback(() => {
    if (allowPrev) {
      changeId(-1, PREV_ID!)
    }
  }, [allowPrev, changeId, PREV_ID])

  const next = useCallback(() => {
    if (allowNext) {
      changeId(1, NEXT_ID!)
    }
  }, [allowNext, changeId, NEXT_ID])

  const handlers = useGestureNavigation({
    prev,
    next,
    allowPrefetch: !showIcons,
    ...(prevId && { prevUrl: `${ROUTES.wiki}/${prevId}` }),
    ...(nextId && { nextUrl: `${ROUTES.wiki}/${nextId}` }),
  })

  const filterRange = showIcons ? range(selected - 10, selected + 10) : [selected]

  const filtered = gallery?.reduce<TFilteredGallery[]>((_filtered, g, i) => {
      if (filterRange.includes(i)) {
        _filtered.push([g, i])
      }
      return _filtered
    },
    []
  )

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
        <GalleryImage rounded={showIcons} wiki={gallery?.[selected]} />
        {allowPrev && (
          <NavButton
            prev
            title={`Previous${PREV_ID ? ' : ' + PREV_ID.toUpperCase() : ''}`}
            onClick={prev}
          />
        )}
        {allowNext && (
          <NavButton title={`Next${NEXT_ID ? ' : ' + NEXT_ID.toUpperCase() : ''}`} onClick={next} />
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
                {filtered?.map(([{ name, iconUrl, bgColor }, fid]) => (
                  <MotionListItem
                    key={fid}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                    initial={{
                      width: '0%',
                      x: `${Math.max((selected - 1) * -100, 10 * -100)}%`,
                    }}
                    animate={{
                      scale: fid === selected ? 1.125 : 1,
                      width: '100%',
                      x: `${Math.max(selected * -100, 10 * -100)}%`,
                    }}
                    exit={{ width: '0%' }}
                    onClick={() => changeId(fid > selected ? 1 : -1, name, fid)}
                  >
                    <Box as="button" boxSize="90%" appearance="none">
                      <GalleryIcon src={iconUrl} bg={bgColor} title={showIcons ? '' : name} />
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
