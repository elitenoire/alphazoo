import { useRef, useEffect } from 'react'
import { Heading, Box, Flex, Text, SimpleGrid } from '@chakra-ui/react'
import { useScroll, useSpring, useTransform, transform, MotionValue } from 'framer-motion'
import { useToken } from '@chakra-ui/react'
import { MotionFlex } from '~components/motion'
import { useAnimeBg } from '~components/AnimatableBackground'

// import { ActivityBoardCanvas } from './ActivityBoardCanvas'

export function ActivityBoard() {
  const [currentBg, newBg] = useToken('colors', ['secondary.200', 'background'])
  const { animeBg } = useAnimeBg()

  const activityBoardRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: activityBoardRef,
    offset: ['start 0.8', 'end start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>
  const scale = useTransform(yScroll, [0, 0.2], [0.875, 1])
  const opacity = useTransform(yScroll, [0, 0.05], [0, 1])

  useEffect(() => {
    const transformer = transform([0, 0.5], [currentBg, newBg])

    const unsubscribe = scrollYProgress.onChange((val) => {
      animeBg?.set(transformer(val))
    })

    return () => {
      unsubscribe()
    }
  }, [animeBg, currentBg, newBg, scrollYProgress])

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
      <SimpleGrid flex={[null, null, null, 1]} py={12} columns={[1, 2]} spacing={4}>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="orange.300"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">A-F</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🦊
            </Box>
          </Flex>
          {/* <ActivityBoardCanvas /> */}
        </Box>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="pink.200"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">G-M</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🐵
            </Box>
          </Flex>
          {/* <ActivityBoardCanvas /> */}
        </Box>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="green.300"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">N-T</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🦚
            </Box>
          </Flex>
          {/* <ActivityBoardCanvas /> */}
        </Box>
        <Box>
          <Flex
            as="h4"
            align="center"
            justify="space-between"
            p={2}
            bg="purple.200"
            borderTopRadius="5px"
          >
            <Flex as="span" direction="column">
              Letters <Heading as="span">U-Z</Heading>
            </Flex>{' '}
            <Box as="span" p={2} fontSize="2xl" bg="white" rounded="full">
              🦓
            </Box>
          </Flex>
          {/* <ActivityBoardCanvas /> */}
        </Box>
      </SimpleGrid>
    </MotionFlex>
  )
}
