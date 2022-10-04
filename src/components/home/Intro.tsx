import { useRef, ReactNode } from 'react'
import {
  useTransform,
  useWillChange,
  useScroll,
  useSpring,
  motion,
  MotionValue,
} from 'framer-motion'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { MotionBox, MagneticBox } from '~components/motion'
import { AnimalHead, AnimalHeadType } from '~components/AnimalHead'

interface MotionAnimalProps {
  animal: AnimalHeadType
  bg?: string
  shift?: boolean
  children: ReactNode
}

function MotionAnimal({ animal, bg, shift, children }: MotionAnimalProps) {
  const dir = shift ? 1 : -1
  return (
    <MotionBox
      pos="relative"
      w="full"
      maxW={['2xs', 'sm']}
      left={[null, null, `${dir * 15}%`, null, `${dir * 20}%`]}
      // @ts-expect-error from chakra-ui official docs
      transition={{ type: 'spring', duration: 1 }}
      initial={{ opacity: 0, scale: 0.4 }}
      viewport={{ margin: '0px 0px -10% 0px' }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <MagneticBox p={[2, 8]}>
        <AnimalHead animal={animal} size="full" bg={bg}>
          <MagneticBox.Parallax as="span" display="inline-block">
            {children}
          </MagneticBox.Parallax>
        </AnimalHead>
      </MagneticBox>
    </MotionBox>
  )
}

export default function Intro() {
  const willChange = useWillChange()
  const introRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start 0.8', '0.8 start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  const moveY = useTransform(yScroll, [0, 1], [0, -600])

  return (
    <Container ref={introRef} maxW="container.lg">
      <motion.div
        // animate={{ y: moveY }}
        style={{ willChange, y: moveY }}
      >
        <Text pt={24} pb={14} fontSize="f3xl">
          <Box as="span" textStyle="highlight" _hover={{ bg: 'accent.200' }}>
            Alphazoo
          </Box>{' '}
          is an early learning app for kids to practise the English Alphabets with a variety of
          animals.
        </Text>
        <Flex align="center" direction="column" rowGap={[60, null, 32]} columnGap={8} py={10}>
          <MotionAnimal animal="tiger" bg="orange.200">
            Grrr
          </MotionAnimal>
          <MotionAnimal animal="lion" shift>
            Roar
          </MotionAnimal>
          <MotionAnimal animal="bear" bg="red.100">
            Growl
          </MotionAnimal>
        </Flex>
        <Text mt={14} fontSize="f3xl" textAlign="center">
          Did you know kids learn best through{' '}
          <Box as="strong" color="brand.500" fontWeight={500}>
            play
          </Box>
          ?
        </Text>
      </motion.div>
    </Container>
  )
}
