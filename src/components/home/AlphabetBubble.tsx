import type { PropsWithChildren } from 'react'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { Box, Text } from '@chakra-ui/react'
import type { MotionBoxProps } from '~components/motion'
import { MotionBox } from '~components/motion'

export const AlphabetBubble = ({ bg, children, ...rest }: PropsWithChildren<MotionBoxProps>) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [0.75, 1, 1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.8, 1], [0, 1, 1, 0.95, 1])
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
