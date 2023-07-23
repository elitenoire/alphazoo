import type { PropsWithChildren } from 'react'
import type { Variants } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useInView, AnimatePresence } from 'framer-motion'
import { Flex, Text, Portal, keyframes } from '@chakra-ui/react'
import { MotionFlex } from '~components/motion'
import { useGeneralSfx } from '~src/context/sfx'
import { ROUTES } from '~src/constants'

import { AnimalList } from '~src/data/activity'

const animalMarquee = AnimalList.slice(0, 29)

const scroll = keyframes`
from {
  transform: translateX(0)
}
to {
  transform: translateX(calc(-100% - 1em))
}
`
const marquee = `${scroll} 45s linear infinite`

const slide: Variants = {
  up: { y: '0%' },
  down: { y: '100%' },
}

const emojiList = ['🍀', '🍂', '🌸', '🍁']

export function ActivityMarquee({ children }: PropsWithChildren) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.25 })
  const { playClick, playHover } = useGeneralSfx()
  const { push } = useRouter()

  const handleClick = useCallback(() => {
    playClick?.()
    void push(`${ROUTES.wiki}`)
  }, [push, playClick])

  return (
    <>
      <div ref={ref}>{children}</div>
      <AnimatePresence>
        {inView && (
          <Portal>
            <MotionFlex
              pos="fixed"
              bottom={0}
              left={0}
              zIndex="max"
              alignItems="center"
              justifyContent="space-between"
              full="100%"
              minH={[14, 16]}
              pt={3}
              bg="black"
              color="secondary.300"
              cursor="pointer"
              _hover={{ bg: 'brand.800' }}
              _active={{ bg: 'brand.900' }}
              variants={slide}
              initial="down"
              animate="up"
              exit="down"
              // @ts-expect-error from chakra-ui official docs
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={handleClick}
              onMouseEnter={playHover}
            >
              <Flex pos="relative" gap={4} overflow="hidden">
                <Flex justify="space-around" flexShrink={0} gap={4} minW="full" animation={marquee}>
                  {animalMarquee.map((animal, idx) => (
                    <>
                      <Text
                        fontFamily="title"
                        fontSize="fxl"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        {animal}
                      </Text>
                      <Text as="span" fontSize="flg">
                        {emojiList[idx % emojiList.length]}
                      </Text>
                    </>
                  ))}
                </Flex>
                <Flex justify="space-around" flexShrink={0} gap={4} minW="full" animation={marquee}>
                  {animalMarquee.map((animal, idx) => (
                    <>
                      <Text
                        fontFamily="title"
                        fontSize="fxl"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        {animal}
                      </Text>
                      <Text as="span" fontSize="flg">
                        {emojiList[idx % emojiList.length]}
                      </Text>
                    </>
                  ))}
                </Flex>
              </Flex>
            </MotionFlex>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}
