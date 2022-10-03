import {
  ReactNode,
  ReactElement,
  MouseEvent,
  cloneElement,
  Children as RC,
  isValidElement,
} from 'react'
import { useTransform, useSpring, MotionValue, useMotionTemplate } from 'framer-motion'
import { Box, BoxProps } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'

interface MagneticProps extends BoxProps {
  children: ReactNode
}

const config = { stiffness: 100, damping: 10 }

export const MagneticBox = ({ children, ...rest }: MagneticProps) => {
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
    <Box {...rest} onMouseLeave={reset} onMouseMove={handleMouse}>
      <MotionBox style={{ transform }}>
        {RC.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement, {
                x: xMove,
                y: yMove,
              })
            : child
        )}
      </MotionBox>
    </Box>
  )
}
