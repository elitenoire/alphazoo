import type { PropsWithChildren } from 'react'
import { useRef, useCallback } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Box, Text } from '@chakra-ui/react'
import type { MotionBoxProps } from '~components/motion'
import { MotionBox } from '~components/motion'
import { useGeneralSfx } from '~/src/context/sfx'

export const AlphabetBubble = ({ bg, children, ...rest }: PropsWithChildren<MotionBoxProps>) => {
  const ref = useRef(null)
  const playedRef = useRef(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [0.75, 1, 1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.8, 1], [0, 1, 1, 0.95, 1])

  const { playPop } = useGeneralSfx()

  const playSfx = useCallback(
    (y: number) => {
      if (y <= 0 || y >= 1) {
        playedRef.current = false
      }
      if (!playedRef.current && y >= 0.1 && y <= 0.5) {
        playPop?.()
        playedRef.current = true
      }
    },
    [playPop]
  )

  useMotionValueEvent(scrollYProgress, 'change', playSfx)

  return (
    <MotionBox {...rest} ref={ref} style={{ scale, opacity }}>
      <Box overflow="hidden" px={1} py={4} bg={bg} rounded="full">
        <Text justifyContent="center" display="flex" fontSize={['f3xl', 'f5xl', null, 'f6xl']}>
          {children}
        </Text>
      </Box>
    </MotionBox>
  )
}
