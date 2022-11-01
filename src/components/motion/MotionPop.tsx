import { ComponentProps } from 'react'
import type { Variants } from 'framer-motion'
import { MotionBox } from '~components/motion'

interface CustomVariantProps {
  factor?: number
  delay?: number
}

interface MotionPopProps extends ComponentProps<typeof MotionBox>, CustomVariantProps {}

const pop: Variants = {
  hidden: ({ factor }: CustomVariantProps) => ({
    opacity: 0,
    scale: factor ?? 0.4,
  }),
  visible: ({ delay }: CustomVariantProps) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 1, delay },
  }),
}

export const MotionPop = ({ delay, factor, ...rest }: MotionPopProps) => {
  return (
    <MotionBox
      {...rest}
      custom={{ factor, delay }}
      variants={pop}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '0px 0px -10% 0px' }}
    />
  )
}
