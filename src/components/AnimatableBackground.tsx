import type { PropsWithChildren } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useToken } from '@chakra-ui/react'
import { AnimeBgContextProvider } from '~src/context/animeBg'

export const AnimatableBackground = ({
  bg = 'background',
  children,
}: PropsWithChildren<{ bg?: string }>) => {
  const initialBg = useToken('colors', bg, 'white')
  const backgroundColor = useMotionValue(initialBg)

  return (
    <AnimeBgContextProvider value={{ animeBg: backgroundColor }}>
      <motion.div style={{ backgroundColor }}>{children}</motion.div>
    </AnimeBgContextProvider>
  )
}
