import { createContext, useContext } from 'react'
import type { ReactHTML, MouseEvent, ComponentProps } from 'react'
import {
  motion,
  useTransform,
  useSpring,
  MotionValue,
  motionValue,
  useMotionTemplate,
} from 'framer-motion'
import { Box, BoxProps } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'

const config = { stiffness: 100, damping: 10 }

const MagneticContext = createContext({
  x: motionValue(0),
  y: motionValue(0),
})

interface MagneticParallaxProps extends ComponentProps<typeof MotionBox> {
  speed?: number
  as?: keyof ReactHTML
}

export const MagneticBox = ({ children, ...rest }: BoxProps) => {
  const x = useSpring(0.5, config) as MotionValue<number>
  const y = useSpring(0.5, config) as MotionValue<number>

  const xMove = useTransform(x, [0, 1], [-1.75, 1.75])
  const yMove = useTransform(y, [0, 1], [-1.75, 1.75])

  const transform = useMotionTemplate`translate(${xMove}em,${yMove}em)`

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / e.currentTarget.clientWidth)
    y.set((e.clientY - rect.top) / e.currentTarget.clientHeight)
  }

  const reset = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <MagneticContext.Provider value={{ x: xMove, y: yMove }}>
      <Box {...rest} onMouseLeave={reset} onMouseMove={handleMouse}>
        <MotionBox
          style={{ transform }}
          // Use hook instead as x & y comes with px unit causing wrong transform
          // transformTemplate={({ x, y }) => `translate(${x}em,${y}em)`}
        >
          {children}
        </MotionBox>
      </Box>
    </MagneticContext.Provider>
  )
}

const MagneticBoxParallax = ({
  speed = 0.2,
  style,
  children,
  as,
  ...rest
}: MagneticParallaxProps) => {
  const { x, y } = useContext(MagneticContext)

  const xMove = useTransform(x, (v) => v * speed)
  const yMove = useTransform(y, (v) => v * speed)

  const transform = useMotionTemplate`translate(${xMove}em,${yMove}em)`

  return (
    <MotionBox {...(as && { as: motion(as) })} style={{ ...style, transform }} {...rest}>
      {children}
    </MotionBox>
  )
}

MagneticBox.Parallax = MagneticBoxParallax
