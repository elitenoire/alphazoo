import type { Variants } from 'framer-motion'
import type { MotionBoxProps } from '~components/motion'
import { motion } from 'framer-motion'
import { MotionBox } from '~components/motion'

interface CustomVariantProps {
  pop?: number
  delay?: number
  once?: boolean
}

interface MotionPopProps extends MotionBoxProps, CustomVariantProps {}

const popVariant: Variants = {
  hidden: ({ pop = 0.4 }: CustomVariantProps) => ({
    opacity: 0,
    scale: pop,
  }),
  visible: ({ delay, pop = 0.4 }: CustomVariantProps) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', delay, duration: pop > 1 ? 1 + (pop - 1) / pop : 1 },
  }),
}

export const MotionPop = ({ delay, pop, once = false, viewport, as, ...rest }: MotionPopProps) => {
  return (
    <MotionBox
      {...rest}
      {...(as && { as: motion(as) })}
      custom={{ pop, delay }}
      variants={popVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '0px 0px -10% 0px', once, ...viewport }}
    />
  )
}
