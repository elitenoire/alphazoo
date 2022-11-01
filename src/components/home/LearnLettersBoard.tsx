import { useRef, useEffect } from 'react'
import {
  useScroll,
  useSpring,
  MotionValue,
  useMotionTemplate,
  useTransform,
  transform,
} from 'framer-motion'
import { useToken } from '@chakra-ui/react'
import { MotionBox, MotionFlex, MotionText } from '~components/motion'
import { useAnimeBg } from '~components/AnimatableBackground'
import { AIrow, JQrow, RZrow } from '~src/data/glyphs'
import { LearnLetters } from './LearnLetters'

export function LearnLettersBoard() {
  const [currentBg, boardBg, newBg] = useToken('colors', ['brand.600', 'black', 'secondary.200'])
  const { animeBg } = useAnimeBg()

  const stripScrollBodyRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: stripScrollBodyRef,
    offset: ['start start', 'end end'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  const x = useTransform(yScroll, [0.1, 1], ['30vw', '-280vw'])
  const opacity = useTransform(yScroll, [0, 0.025, 0.925, 1], [0, 1, 1, 0.5])
  const borderOpacity = useTransform(yScroll, [0.1, 0.2, 0.95, 1], [0, 1, 1, 0])
  const borderColor = useMotionTemplate`rgba(250,240,137,${borderOpacity})`

  useEffect(() => {
    const transformer = transform([0, 0.025, 0.95, 1], [currentBg, boardBg, boardBg, newBg])

    const unsubscribe = yScroll.onChange((val) => {
      animeBg?.set(transformer(val))
    })

    return () => {
      unsubscribe()
    }
  }, [animeBg, boardBg, currentBg, newBg, yScroll])

  return (
    <MotionBox
      ref={stripScrollBodyRef}
      h="300vw"
      initial={{ y: 400 }}
      whileInView={{ y: 0 }}
      viewport={{ margin: '0px 0px -50% 0px' }}
      // @ts-expect-error from chakra-ui official docs
      transition={{ duration: 0.65 }}
    >
      <MotionFlex
        pos="sticky"
        top={0}
        alignItems="center"
        overflow="hidden"
        minH="100vh"
        borderWidth="3px"
        style={{ borderColor }}
      >
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
        <MotionFlex minW={0} style={{ x, opacity }}>
          <LearnLetters letters={AIrow} />
          <LearnLetters letters={JQrow} />
          <LearnLetters letters={RZrow} />
        </MotionFlex>
      </MotionFlex>
    </MotionBox>
  )
}
