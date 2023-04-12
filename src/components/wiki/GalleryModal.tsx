import NextImage from 'next/image'
import { useRef, useState, useCallback } from 'react'
import useKeypress from 'react-use-keypress'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import type { ListProps, ListItemProps, AspectRatioProps } from '@chakra-ui/react'
import {
  Box,
  AspectRatio,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import { range } from '~/src/utils'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

const gallery = Array.from({ length: 80 }, (x, i) => i)

export const GalleryModal = () => {
  const [direction, setDirection] = useState(0)
  const [selected, setSelected] = useState(1)

  const changePhotoId = useCallback(
    (newVal: number) => {
      setDirection(newVal > selected ? 1 : -1)
      setSelected(newVal)
    },
    [selected]
  )

  const prev = useCallback(() => {
    if (selected > 0) {
      changePhotoId(selected - 1)
    }
  }, [changePhotoId, selected])

  const next = useCallback(() => {
    if (selected + 1 < gallery.length) {
      changePhotoId(selected + 1)
    }
  }, [changePhotoId, selected])

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

  const filtered = gallery.filter((img) => range(selected - 10, selected + 10).includes(img))

  const currentImage = gallery[selected] // : currentPhoto

  return (
    <Modal isOpen motionPreset="none" onClose={() => ({})} size="full">
      <ModalContent
        pos="relative"
        overflow="hidden"
        bg="blackAlpha.700"
        backdropFilter="blur(5px)"
        containerProps={{ zIndex: 'zen' }}
      >
        <ModalBody
          pos="relative"
          zIndex={1}
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          rowGap={1}
          display="flex"
          pt={[0, null, 1]}
          pb={1}
          px={[0, null, 6]}
          {...handlers}
        >
          <MotionConfig
            transition={{
              default: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.2 },
            }}
          >
            <Box flex={1} w="full" minH={400} bg="white" rounded={[null, null, 'card']}>
              <Text fontSize="f4xl" fontWeight={700}>
                {currentImage}
              </Text>
            </Box>
            <Box w="full">
              <MotionList
                initial={false}
                sx={{ aspectRatio: '1' }}
                columnGap={0}
                display="flex"
                h={20}
                mx="auto"
              >
                <AnimatePresence initial={false}>
                  {filtered.map((g) => (
                    <MotionListItem
                      key={g}
                      // w="10%"
                      // minW={20}
                      flexShrink={0}
                      initial={{
                        width: '0%',
                        x: `${Math.max((selected - 1) * -100, 10 * -100)}%`,
                      }}
                      animate={{
                        scale: g === selected ? 1.05 : 1,
                        width: '100%',
                        x: `${Math.max(selected * -100, 10 * -100)}%`,
                      }}
                      exit={{ width: '0%' }}
                      onClick={() => changePhotoId(g)}
                    >
                      <Box
                        as="button"
                        w="full"
                        bg="white"
                        _hover={{ transform: 'scale(1.05)' }}
                        appearance="none"
                        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                        rounded="icon"
                        transitionDuration="0.2s"
                        transitionProperty="transform"
                        transitionTimingFunction="ease-in-out"
                      >
                        <AspectRatio ratio={1}>
                          <Box>{g}</Box>
                        </AspectRatio>
                      </Box>
                    </MotionListItem>
                  ))}
                </AnimatePresence>
              </MotionList>
            </Box>
          </MotionConfig>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
