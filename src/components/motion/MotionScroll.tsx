import type { MotionValue, MotionProps } from 'framer-motion'
import type { MotionBoxProps } from '~components/motion'
import { useRef } from 'react'
import { useTransform, useScroll, useSpring } from 'framer-motion'
import { MotionBox } from '~components/motion'

type MotionScrollProps = MotionBoxProps & {
  distance?: number
}

export const MotionScroll = ({ distance = 600, style, ...rest }: MotionScrollProps) => {
  const scrollRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start 0.8', '0.8 start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  const moveY = useTransform(yScroll, [0, 1], [0, -distance])

  return (
    <MotionBox
      {...rest}
      ref={scrollRef}
      willChange="transform"
      style={{ ...(style as MotionProps['style']), y: moveY }}
    />
  )
}
