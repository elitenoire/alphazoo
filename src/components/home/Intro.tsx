import type { ReactNode } from 'react'
import { Box, Flex, Text, VisuallyHidden, chakra } from '@chakra-ui/react'
import { MotionPop, MagneticBox } from '~components/motion'
import { AnimalHead, AnimalHeadType } from '~components/AnimalHead'
import { HOMEPAGE_IDS, SITE_CONFIG } from '~src/constants'

import { ReactComponent as TreeSvg } from '~public/img/tree.svg'

const ChakraTree = chakra(TreeSvg)

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
    <Box as="section" mb={[null, 20]} pt={56} aria-labelledby={HOMEPAGE_IDS.intro}>
      <VisuallyHidden as="h2" id={HOMEPAGE_IDS.intro}>
        Introducing {SITE_CONFIG.appName}
      </VisuallyHidden>
      <Text fontSize={['f2xl', null, null, null, 'f3xl']}>
        <Box as="strong" color="brand.500">
          {SITE_CONFIG.appName}
        </Box>{' '}
        is an early learning app for kids to practise the English Alphabets with a variety of
        animals.
      </Text>
      <Box
        pos="sticky"
        top={40}
        display={['none', 'block']}
        overflow="hidden"
        h="120vh"
        minH="md"
        maxH="4xl"
        mx="-1em"
        pt="20vh"
      >
        <ChakraTree h="100%" mx="auto" fill="brand.500" opacity={0.15} />
      </Box>
      <Flex
        align="center"
        direction="column"
        rowGap={[40, null, 32]}
        columnGap={8}
        pt={[24, 0]}
        pb={48}
      >
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
    </Box>
  )
}
