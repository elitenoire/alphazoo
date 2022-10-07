import type { ReactNode } from 'react'
import { Box, Flex, Text, VisuallyHidden } from '@chakra-ui/react'
import { MotionPop, MagneticBox } from '~components/motion'
import { AnimalHead, AnimalHeadType } from '~components/AnimalHead'

interface MotionAnimalProps {
  animal: AnimalHeadType
  bg?: string
  shift?: boolean
  children: ReactNode
}

const MotionAnimal = ({ animal, bg, shift, children }: MotionAnimalProps) => {
  const dir = shift ? 1 : -1
  return (
    <MotionPop
      pos="relative"
      w="full"
      maxW={['2xs', 'sm']}
      left={[null, null, `${dir * 15}%`, null, `${dir * 20}%`]}
    >
      <MagneticBox p={[2, 8]}>
        <AnimalHead animal={animal} size="full" bg={bg}>
          <MagneticBox.Parallax as="span" display="inline-block">
            {children}
          </MagneticBox.Parallax>
        </AnimalHead>
      </MagneticBox>
    </MotionPop>
  )
}

export default function Intro() {
  return (
    <section>
      <VisuallyHidden as="h2">Introducing Alphazoo</VisuallyHidden>
      <Text pt={24} fontSize="f3xl">
        <Box as="span" textStyle="highlight" _hover={{ bg: 'accent.200' }}>
          Alphazoo
        </Box>{' '}
        is an early learning app for kids to practise the English Alphabets with a variety of
        animals.
      </Text>
      <Flex align="center" direction="column" rowGap={[40, null, 32]} columnGap={8} pt={24} pb={48}>
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
    </section>
  )
}
