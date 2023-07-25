import type { MouseEvent } from 'react'
import type { MotionValue } from 'framer-motion'
import { useRef, useCallback } from 'react'
import NextImage from 'next/image'
import {
  useScroll,
  useSpring,
  useMotionTemplate,
  useTransform,
  useAnimate,
  transform,
} from 'framer-motion'
import { Box, useToken } from '@chakra-ui/react'
import { MotionSpan, MotionBox, MotionFlex, MotionText } from '~components/motion'
import { useAnimeBg } from '~src/hooks/useAnimeBg'
import { AIrow, JQrow, RZrow } from '~src/data/glyphs'
import { LearnLetters } from './LearnLetters'

import { ReactComponent as PandySvg } from '~public/img/pandy.svg'
import ImgPeepers from '~public/img/peepers.svg'

export function LearnLettersBoard() {
  const [currentBg, boardBg, newBg] = useToken('colors', ['brand.600', 'black', 'secondary.200'])
  const [peepersScope, animatePeepers] = useAnimate()

  const stripScrollBodyRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: stripScrollBodyRef,
    offset: ['start 0.2', 'end end'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  const x = useTransform(yScroll, [0.2, 1], ['50vw', '-280vw'])
  const opacity = useTransform(yScroll, [0.22, 0.32, 0.925, 1], [0, 1, 1, 0.5])
  const stickyOpacity = useTransform(yScroll, [0, 0.22, 0.95, 1], [1, 0.2, 0.2, 0.95])
  const borderOpacity = useTransform(yScroll, [0.22, 0.32, 0.95, 1], [0, 1, 1, 0])
  const borderColor = useMotionTemplate`rgba(250,240,137,${borderOpacity})`
  const bubbleMove = useTransform(yScroll, [0, 0.2], [60, -15])

  const transformer = transform([0, 0.2, 0.95, 1], [currentBg, boardBg, boardBg, newBg])

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const offsetX = event.clientX - window.innerWidth / 2

      void animatePeepers(
        peepersScope.current,
        { x: Math.max(offsetX / 5, 5) },
        { type: 'spring', stiffness: 60 }
      )
    },
    [animatePeepers, peepersScope]
  )

  useAnimeBg(yScroll, transformer)

  return (
    <Box ref={stripScrollBodyRef} h="300vw" mt={32}>
      <MotionFlex
        pos="sticky"
        top={0}
        alignItems="center"
        overflow="hidden"
        minH="100vh"
        borderWidth="3px"
        style={{ borderColor }}
        onMouseMove={handleMouseMove}
      >
        <MotionFlex
          pos="absolute"
          flexDir={['column', null, null, 'row']}
          alignItems={['center', null, null, 'flex-start']}
          justifyContent="center"
          pt={1}
          inset={0}
          style={{ opacity: stickyOpacity }}
        >
          <MotionBox
            pos={[null, null, null, 'absolute']}
            top={4}
            right={1}
            px={3}
            py={1}
            color="background"
            fontFamily="glyph"
            fontSize="6vw"
            bg="text"
            userSelect="none"
            rounded="50% 50% 10% 90% / 70% 60% 40% 30%"
            style={{ y: bubbleMove }}
          >
            <MotionSpan style={{ opacity: stickyOpacity }}>ABC</MotionSpan>
          </MotionBox>
          <PandySvg />
        </MotionFlex>
        <MotionText
          pos="absolute"
          top={0}
          left={0}
          px={2}
          bg="secondary.200"
          fontWeight={500}
          fontSize="xs"
          borderBottomRightRadius="5px"
          userSelect="none"
          style={{ opacity: borderOpacity }}
        >
          Interactive
        </MotionText>
        <MotionFlex minW={0} minH="inherit" style={{ x, opacity }}>
          <LearnLetters letters={AIrow} />
          <LearnLetters letters={JQrow} />
          <LearnLetters letters={RZrow} />
        </MotionFlex>
        <MotionBox
          ref={peepersScope}
          display={['none', 'block']}
          pos="absolute"
          w={['20%', null, '10%']}
          right={0}
          bottom={0}
          style={{ opacity: borderOpacity }}
        >
          <NextImage src={ImgPeepers} alt="Peeping animals faces" unoptimized />
        </MotionBox>
      </MotionFlex>
    </Box>
  )
}
