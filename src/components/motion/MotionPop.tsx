import type { Variants } from 'framer-motion'
import type { MotionBoxProps } from '~components/motion'
import { MotionBox } from '~components/motion'

interface CustomVariantProps {
  pop?: number
  delay?: number
  once?: boolean
}

interface MotionPopProps extends MotionBoxProps, CustomVariantProps {}

const popVariant: Variants = {
  hidden: ({ pop }: CustomVariantProps) => ({
    opacity: 0,
    scale: pop ?? 0.4,
  }),
  visible: ({ delay }: CustomVariantProps) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 1, delay },
  }),
}

export const MotionPop = ({ delay, pop, once = false, viewport, ...rest }: MotionPopProps) => {
  return (
    <MotionBox
      {...rest}
      custom={{ pop, delay }}
      variants={popVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '0px 0px -10% 0px', once, ...viewport }}
    />
  )
}
