import type { ReactElement } from 'react'
import { Box, Flex, Heading, Fade, SlideFade } from '@chakra-ui/react'
import { MotionPop, MotionBox } from '~components/motion'
import { AnimalHead } from '~components/AnimalHead'
import { FixedBackground } from '~components/FixedBackground'

import type { LayoutProps } from '~components/layout/DefaultLayout'
import { getPlayLayout } from '~components/layout/DefaultLayout'

import { useScrollReveal } from '~/src/hooks/useScrollReveal'

import ImgPlay from '~public/img/bg-play.svg'

export default function Play() {
  const { scrollReveal } = useScrollReveal({ offset: ['start end', 'end start'] })

  return (
    <Box layerStyle="page" pos="relative" zIndex={1} px={0} pb={0}>
      <Fade transition={{ enter: { duration: 0.6 } }} in>
        <Heading as="h1" color="background" textAlign="center">
          <Box
            as="span"
            // display={['block', 'inline']}
            // p={[null, 1]}
            color="brand.300"
            // fontSize="3xl"
          >
            Play
          </Box>{' '}
          Zone
        </Heading>
      </Fade>
      <Flex mt={20} mb={24} px="5%" transform="auto" data-group translateX={['-15%', '-5%', 0]}>
        <MotionBox
          flex={1}
          initial={{ x: '80%', scale: 0.7 }}
          animate={{
            x: '80%',
            scale: 0.7,
            rotate: [0, -15, 15, 0, -5, -15, -30, -45],
            transition: { duration: 1, delay: 0.25 + 0.65 + 2.25 },
          }}
        >
          <MotionPop delay={0.25 + 0.65} once>
            <AnimalHead animal="tiger" icon />
          </MotionPop>
        </MotionBox>
        <Box
          flex={1}
          _groupHover={{
            translateY: '-10%',
            scale: '0.98',
          }}
          transform="auto"
          transition="transform 0.3s"
          scale={0.9}
          translateX="35%"
        >
          <MotionPop delay={0.25 + 0.35} once>
            <AnimalHead animal="frog" icon />
          </MotionPop>
        </Box>
        <Box zIndex={2} flex={1}>
          <MotionPop delay={0.25} once>
            <AnimalHead animal="rabbit" icon />
          </MotionPop>
        </Box>
        <Box
          zIndex={1}
          flex={1}
          display={['none', 'block']}
          _groupHover={{
            translateY: '-10%',
            scale: 0.98,
          }}
          transform="auto"
          transition="transform 0.3s ease 0.15s"
          scale={0.9}
          translateX="-35%"
        >
          <MotionPop delay={0.25 + 0.5} once>
            <AnimalHead animal="squirrel" icon />
          </MotionPop>
        </Box>
        <Box flex={1} display={['none', null, 'block']} transform="translateX(-80%) scale(0.7)">
          <MotionPop delay={0.25 + 0.8} once>
            <AnimalHead animal="lion" icon />
          </MotionPop>
        </Box>
      </Flex>
      <SlideFade transition={{ enter: { duration: 0.6, delay: 0.25 + 0.65 + 2.25 } }} in>
        <MotionBox
          minH="sm"
          mx={[1, 3]}
          bg="brand.100"
          roundedTop={['card', 'bigCard']}
          {...scrollReveal}
        />
      </SlideFade>
    </Box>
  )
}

Play.getLayout = (page: ReactElement, props?: LayoutProps) => {
  return getPlayLayout(
    <FixedBackground src={ImgPlay} alt="">
      {page}
    </FixedBackground>,
    props
  )
}
