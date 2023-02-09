import type { PropsWithChildren } from 'react'
import type { MotionValue, Variants } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Heading, Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import {
  useScroll,
  useSpring,
  useTransform,
  transform,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import { useToken, Portal, keyframes } from '@chakra-ui/react'
import { MotionFlex, MotionBox } from '~components/motion'
import { useAnimeBg } from '~src/hooks/useAnimeBg'

import { activities } from '~/src/data/activity'

// import { ActivityBoardCanvas } from './ActivityBoardCanvas'

const scroll = keyframes`
from {
  transform: translateX(0)
}
to {
  transform: translateX(calc(-100% - 1em))
}
`
const marquee = `${scroll} 14s linear infinite`

const slide: Variants = {
  up: { y: '0%' },
  down: { y: '100%' },
}

export function ActivityGrid() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef)

  const [selected, setSelected] = useState()

  const show = inView // && selected

  const handleSelect = useCallback(
    (color: string) => (alpha) => {
      setSelected({ ...alpha, color })
    },
    []
  )

  // reset when not in view
  useEffect(() => {
    if (!inView) {
      setSelected(undefined)
    }
  }, [inView])

  return (
    <>
      <SimpleGrid ref={gridRef} flex={[null, null, null, 1]} py={12} columns={[1, 2]} spacing={4}>
        {activities.map(({ name, icon, color, alphabet }, idx) => {
          return (
            <Box key={`${name}-${idx}`}>
              <Flex
                as="h4"
                align="center"
                justify="space-between"
                p={2}
                bg={color}
                borderTopRadius="5px"
              >
                <Flex as="span" direction="column">
                  Letters <Heading as="span">{name}</Heading>
                </Flex>{' '}
                <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
                  {icon}
                </Box>
              </Flex>
              {/* <ActivityBoardCanvas /> */}
            </Box>
          )
        })}
      </SimpleGrid>
      <AnimatePresence>
        {show && (
          <Portal>
            <MotionFlex
              pos="fixed"
              bottom={0}
              left={0}
              zIndex="max"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
              minH={[14, 16]}
              py={3}
              bg="black"
              color="orange.300"
              cursor="pointer"
              _hover={{ bg: 'brand.dark' }}
              variants={slide}
              initial="down"
              animate="up"
              exit="down"
              // @ts-expect-error from chakra-ui official docs
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <MotionBox
                pos="absolute"
                top="-35%"
                left={8}
                p={2}
                zIndex={1}
                bg="inherit"
                rounded="full"
                variants={slide}
                initial="down"
                animate="up"
                exit="down"
                // @ts-expect-error from chakra-ui official docs
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <Box
                  as="span"
                  display="block"
                  p={2}
                  fontSize="2xl"
                  bg="background"
                  rounded="inherit"
                >
                  🦊
                </Box>
              </MotionBox>
              <Flex pos="relative" gap={4} overflow="hidden" w="200%">
                <Flex
                  align="center"
                  justify="space-around"
                  flexShrink={0}
                  gap={4}
                  minW="full"
                  animation={marquee}
                >
                  <Heading as="p">Antelope</Heading>
                  <Heading as="span">🍂</Heading>
                  <Heading as="p">Alligator</Heading>
                  <Heading as="span">🍀</Heading>
                  <Heading as="p">Ant</Heading>
                  <Heading as="span">🍁</Heading>
                </Flex>
                <Flex justify="space-around" flexShrink={0} gap={4} minW="full" animation={marquee}>
                  <Heading as="p">Antelope</Heading>
                  <Heading as="span">🍂</Heading>
                  <Heading as="p">Alligator</Heading>
                  <Heading as="span">🍀</Heading>
                  <Heading as="p">Ant</Heading>
                  <Heading as="span">🍁</Heading>
                </Flex>
              </Flex>
            </MotionFlex>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}

export function ActivityBoard({ children }: PropsWithChildren) {
  const [currentBg, newBg] = useToken('colors', ['secondary.200', 'background'])

  const activityBoardRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: activityBoardRef,
    offset: ['start 0.8', 'end start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>
  const scale = useTransform(yScroll, [0, 0.2], [0.875, 1])
  const opacity = useTransform(yScroll, [0, 0.05], [0, 1])

  const transformer = transform([0, 0.5], [currentBg, newBg])

  useAnimeBg(scrollYProgress, transformer)

  return (
    <MotionFlex
      ref={activityBoardRef}
      flexDir={['column', null, null, 'row']}
      columnGap={4}
      mx={[null, 1, null, 5]}
      px={4}
      py={[12, 24]}
      bg="secondary.300"
      rounded={['card', 'bigCard']}
      style={{ scale, opacity }}
    >
      <Box w={[null, null, null, '30%']}>
        <Flex
          pos={[null, null, null, 'sticky']}
          top={[null, null, null, 4]}
          align={[null, 'center']}
          justify="space-between"
          wrap={[null, null, null, 'wrap']}
          direction={['column', null, 'row']}
          rowGap={[2, null, null, 8]}
        >
          <Text as="h3" maxW={[null, null, 44]} fontSize="f2xl" fontWeight={700}>
            Animal
            <Box
              as="span"
              display="inline-flex"
              mr={[1, null, null, 0]}
              ml={1}
              px="7px"
              py="5px"
              fontSize="xs"
              borderWidth="1px"
              borderColor="currentColor"
              rounded="full"
            >
              <Box as="span" p={1} bg="white" rounded="inherit">
                🦁
              </Box>
              <Box as="span" ml="-2" p={1} bg="white" rounded="inherit">
                🐲
              </Box>
            </Box>
            Alphabets
          </Text>
          <Text maxW={[null, null, '3xs']} fontSize="xl" textAlign={[null, 'center', 'left']}>
            Discover animals that begin with the selected letter
          </Text>
        </Flex>
      </Box>
      {children}
    </MotionFlex>
  )
}
