import type { Variants, MotionProps } from 'framer-motion'
import type { MotionBoxProps } from '~components/motion'
import { motion } from 'framer-motion'
import { MotionBox } from '~components/motion'

type CustomProps = {
  pop?: number
  delay?: number
  once?: boolean
  marge?: string
}

type VariantProps = Pick<CustomProps, 'pop' | 'delay'>

type MotionPopProps = MotionBoxProps & CustomProps

const popVariant: Variants = {
  hidden: ({ pop = 0.4 }: VariantProps) => ({
    opacity: 0,
    scale: pop,
  }),
  visible: ({ delay, pop = 0.4 }: VariantProps) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', delay, duration: pop > 1 ? 1 + (pop - 1) / pop : 1 },
  }),
}

export const MotionPop = ({
  delay,
  pop,
  marge = '-10%',
  once = false,
  viewport,
  as,
  ...rest
}: MotionPopProps) => {
  return (
    <MotionBox
      {...rest}
      {...(as && { as: motion(as) })}
      custom={{ pop, delay }}
      variants={popVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: `0px 0px ${marge} 0px`, once, ...(viewport as MotionProps['viewport']) }}
    />
  )
}
