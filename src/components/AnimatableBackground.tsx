import { createContext, useContext, ReactNode } from 'react'
import { motion, useMotionValue, MotionValue } from 'framer-motion'
import { useToken } from '@chakra-ui/react'

interface TAnimeBg {
  animeBg?: MotionValue<string>
}

export const AnimeBgContext = createContext<TAnimeBg>({})

export const useAnimeBg = () => useContext(AnimeBgContext)

export const AnimatableBackground = ({
  bg = 'background',
  children,
}: {
  bg?: string
  children: ReactNode
}) => {
  const initialBg = useToken('colors', bg, 'white')
  const backgroundColor = useMotionValue(initialBg)

  return (
    <AnimeBgContext.Provider value={{ animeBg: backgroundColor }}>
      <motion.div style={{ backgroundColor }}>{children}</motion.div>
    </AnimeBgContext.Provider>
  )
}
