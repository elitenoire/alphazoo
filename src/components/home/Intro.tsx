import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useScroll, transform } from 'framer-motion'
import { Box, Flex, Text, VisuallyHidden, Link, useToken, chakra } from '@chakra-ui/react'
import { MotionPop, MagneticBox } from '~components/motion'
import { AnimalHead, AnimalHeadType } from '~components/AnimalHead'
import { useAnimeBg } from '~src/hooks/useAnimeBg'
import { HOMEPAGE_IDS, SITE_CONFIG } from '~src/constants'

import { ReactComponent as ScenerySvg } from '~public/img/scenery.svg'

const ChakraScenery = chakra(ScenerySvg)

interface MotionAnimalProps {
  animal: AnimalHeadType
  shift?: boolean
  children: ReactNode
}

const MotionAnimal = ({ animal, shift, children }: MotionAnimalProps) => {
  const dir = shift ? 1 : -1
  return (
    <MotionPop
      pos="relative"
      w="full"
      maxW={['2xs', 'sm']}
      left={[null, null, `${dir * 15}%`, null, `${dir * 20}%`]}
    >
      <MagneticBox p={[2, 8]}>
        <AnimalHead animal={animal} size="full" bg="blackAlpha.300" fill="blackAlpha.400">
          <MagneticBox.Parallax as="span" display="inline-block">
            {children}
          </MagneticBox.Parallax>
        </AnimalHead>
      </MagneticBox>
    </MotionPop>
  )
}

export default function Intro() {
  const [currentBg, newBg] = useToken('colors', ['brand.700', 'brand.600'])

  const sceneRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['0.25 end', 'end start'],
  })

  const transformer = transform([0, 0.25], [currentBg, newBg])

  useAnimeBg(scrollYProgress, transformer)

  return (
    <Box as="section" mb={[null, 20]} pt={56} aria-labelledby={HOMEPAGE_IDS.intro}>
      <VisuallyHidden as="h2" id={HOMEPAGE_IDS.intro}>
        Introducing {SITE_CONFIG.appName}
      </VisuallyHidden>
      <Box px={[4, null, 8]}>
        <Text fontSize={['f2xl', null, null, null, 'f3xl']}>
          <Box as="strong" px="0.3em" color="brand.900" bg="secondary.300" rounded="0.3em">
            {SITE_CONFIG.appName}
          </Box>{' '}
          is an early learning app for kids to practise the English Alphabets with a variety of
          animals.
        </Text>
      </Box>
      <Box
        ref={sceneRef}
        pos="sticky"
        top={0}
        overflow="hidden"
        h={['120vmax', null, null, 'auto']}
        minH={['md', null, null, 0]}
        maxH={['3xl', null, '4xl', 'none']}
      >
        <ChakraScenery h="full" />
        <Text
          as="small"
          pos="absolute"
          right={1}
          bottom="27%"
          align="right"
          maxW="2xs"
          opacity={0.1}
          _hover={{ opacity: 0.4 }}
        >
          Artworks by{' '}
          <Link href="https://www.vecteezy.com/members/wawau9615931" isExternal variant="footer">
            @wawausetya
          </Link>
          ,{' '}
          <Link href="https://www.freepik.com/author/gstudioimagen" isExternal variant="footer">
            @gstudioimagen
          </Link>
          ,{' '}
          <Link href="https://www.vecteezy.com/members/doodervector" isExternal variant="footer">
            @Dooder
          </Link>
          .
        </Text>
      </Box>
      <Flex
        align="center"
        direction="column"
        rowGap={[40, null, 32]}
        columnGap={8}
        pt={[24, 0]}
        pb={48}
      >
        <MotionAnimal animal="tiger">Grrr</MotionAnimal>
        <MotionAnimal animal="lion" shift>
          Roar
        </MotionAnimal>
        <MotionAnimal animal="bear">Growl</MotionAnimal>
      </Flex>
    </Box>
  )
}
