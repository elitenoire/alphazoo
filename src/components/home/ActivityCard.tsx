import type { MotionValue } from 'framer-motion'
import NextImage from 'next/image'
import { useRef } from 'react'
import { Box, Flex, Text, useToken } from '@chakra-ui/react'
import { useScroll, useSpring, useTransform, transform } from 'framer-motion'
import { MotionFlex, MotionPop } from '~components/motion'
import { useAnimeBg } from '~src/hooks/useAnimeBg'

import ImgActivityOne from '~public/img/activity-1.svg'
import ImgActivityTwo from '~public/img/activity-2.svg'
import ImgActivityThree from '~public/img/activity-3.svg'

export function ActivityCard() {
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
      px={[4, null, null, 12]}
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
          rowGap={[2, null, null, 12]}
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
              border="1px solid"
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
          <Text maxW={[null, null, '3xs']} fontSize="2xl" textAlign={[null, 'center', 'left']}>
            Discover animals that begin with each alphabet.
          </Text>
        </Flex>
      </Box>
      <Flex flex={{ lg: 1 }} pt={12} px={[12, null, 24]}>
        <Flex direction="column" flex={4} rowGap={4}>
          <MotionPop>
            <NextImage src={ImgActivityOne} className="w-full" alt="" unoptimized />
          </MotionPop>
          <MotionPop>
            <NextImage src={ImgActivityTwo} className="w-full" alt="" unoptimized />
          </MotionPop>
        </Flex>
        <Box flex={3} display={['none', 'block']}>
          <MotionPop pos="relative" boxSize="full">
            <NextImage src={ImgActivityThree} fill alt="" unoptimized />
          </MotionPop>
        </Box>
      </Flex>
    </MotionFlex>
  )
}
