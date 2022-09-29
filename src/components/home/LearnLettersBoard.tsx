import { useRef, useEffect } from 'react'
import { useTransform, useScroll, useSpring, MotionValue } from 'framer-motion'
import { Flex, useToken } from '@chakra-ui/react'
import { MotionBox, MotionFlex } from '~components/motion'
import { useAnimeBg } from '~components/AnimatableBackground'
import { AIrow, JQrow, RZrow } from '~src/data/glyphs'
import { LearnLetters } from './LearnLetters'

export function LearnLettersBoard() {
  const [bodyBg, boardBg] = useToken('colors', ['background', 'black'])
  const { animeBg } = useAnimeBg()

  const stripScrollBodyRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: stripScrollBodyRef,
    offset: ['start start', 'end end'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  const x = useTransform(yScroll, [0.1, 1], ['30vw', '-280vw'])
  const opacity = useTransform(yScroll, [0, 0.025, 0.925, 1], [0, 1, 1, 0.5])
  const bg = useTransform(yScroll, [0, 0.025, 0.95, 1], [bodyBg, boardBg, boardBg, bodyBg])

  useEffect(() => {
    const unsubscribe = bg.onChange((val) => {
      animeBg?.set(val)
    })

    return () => {
      unsubscribe()
    }
  }, [animeBg, bg])

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
      <Flex pos="sticky" top={0} align="center" overflow="hidden" minH="100vh">
        <MotionFlex minW={0} style={{ x, opacity }}>
          <LearnLetters letters={AIrow} />
          <LearnLetters letters={JQrow} />
          <LearnLetters letters={RZrow} />
        </MotionFlex>
      </Flex>
    </MotionBox>
  )
}
