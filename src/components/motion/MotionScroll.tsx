import { useRef, ComponentProps } from 'react'
import { useTransform, useWillChange, useScroll, useSpring, MotionValue } from 'framer-motion'
import { MotionBox } from '~components/motion'

interface MotionScrollProps extends ComponentProps<typeof MotionBox> {
  distance?: number
}

export const MotionScroll = ({ distance = 600, style, ...rest }: MotionScrollProps) => {
  const willChange = useWillChange()
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
      // animate={{ y: moveY }}
      style={{ ...style, willChange, y: moveY }}
    />
  )
}
