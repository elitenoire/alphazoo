import { ComponentProps } from 'react'
import { MotionBox } from '~components/motion'

const pop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 1, delay: d },
  }),
}

interface MotionPopProps extends ComponentProps<typeof MotionBox> {
  delay?: number
}

export const MotionPop = ({ delay, ...rest }: MotionPopProps) => {
  return (
    <MotionBox
      {...rest}
      {...(delay && { custom: delay })}
      variants={pop}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: '0px 0px -10% 0px' }}
    />
  )
}
