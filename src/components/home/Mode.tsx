import { useRef } from 'react'
import { useTransform, useScroll, useSpring, MotionValue, useWillChange } from 'framer-motion'
import { Box, Flex, Heading, Text, Button, chakra, useToken } from '@chakra-ui/react'
import { MotionFlex, MagneticBox } from '~components/motion'

import { ReactComponent as SquircleBgSvg } from '~public/img/bg-squircle.svg'
import { ReactComponent as Learn } from '~public/img/learn.svg'
import { ReactComponent as Play } from '~public/img/play.svg'
import { ReactComponent as PandaSvg } from '~public/img/panda.svg'

const LearnSvg = chakra(Learn)
const PlaySvg = chakra(Play)

const item = {
  hidden: (i: number) => ({ opacity: 0, x: i * 20 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Mode() {
  const [squircleBg] = useToken('colors', ['accent.200'])
  const willChange = useWillChange()

  const modeRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: modeRef,
    offset: ['start 0.8', '0.8 start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  const moveY = useTransform(yScroll, [0, 1], [-100, -400])

  return (
    <MotionFlex
      ref={modeRef}
      pos="relative"
      justifyContent="center"
      mx={7}
      pt={24}
      pb={16}
      bg="accent.400"
      borderRadius="4em"
      style={{ willChange, y: moveY }}
    >
      <Box pos="relative" zIndex={1} w="full" px={4}>
        <Heading color="accent.900" fontSize="f5xl" textAlign="center">
          Learn + Play
        </Heading>
        <Text px={6} color="accent.50" fontSize="fxl" textAlign="center">
          Two fun and easy educational modes for kids to enjoy.
        </Text>
        <Flex justify="space-around" wrap="wrap" rowGap={6} columnGap={4} mt={10} mb={14}>
          <MagneticBox p={2}>
            <MotionFlex
              variants={item}
              custom={-1}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.3 }}
              pos="relative"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
              gap={5}
              w="xs"
              h="xs"
              _hover={{
                '& > div': { opacity: 0.85 },
              }}
            >
              <Box pos="absolute" top={0} w="full" opacity={0.5} transition="opacity 0.2s">
                <SquircleBgSvg fill={squircleBg} />
              </Box>
              <LearnSvg zIndex={1} pos="relative" />
              <Button
                w="55%"
                color="accent.500"
                bg="accent.50"
                borderRadius="full"
                shadow="2xl"
                _hover={{
                  boxShadow: 'lg',
                  transform: 'translateY(-2px)',
                }}
                _active={{
                  bg: 'accent.200',
                }}
                transition="all 0.25s ease-in-out"
                colorScheme="accent"
                size="lg"
              >
                Learn
              </Button>
            </MotionFlex>
          </MagneticBox>
          <MagneticBox p={2}>
            <MotionFlex
              variants={item}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.35 }}
              pos="relative"
              alignItems="center"
              justifyContent="center"
              flexDir="column"
              gap={4}
              w="xs"
              h="xs"
              _hover={{
                '& > div': { opacity: 0.85 },
              }}
            >
              <Box pos="absolute" top={0} w="full" opacity={0.5} transition="opacity 0.2s">
                <SquircleBgSvg fill={squircleBg} />
              </Box>
              <PlaySvg zIndex={1} pos="relative" />
              <Button
                w="55%"
                borderRadius="full"
                shadow="2xl"
                _hover={{
                  bg: 'brand.600',
                  boxShadow: 'lg',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.25s ease-in-out"
                size="lg"
              >
                Play
              </Button>
            </MotionFlex>
          </MagneticBox>
        </Flex>
      </Box>
      <Box pos="absolute" bottom={0} w={['45%', null, '30%']}>
        <PandaSvg />
      </Box>
    </MotionFlex>
  )
}
