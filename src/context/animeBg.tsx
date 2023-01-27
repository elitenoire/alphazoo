import { createContext, useContext } from 'react'
import type { MotionValue } from 'framer-motion'

interface TAnimeBg {
  animeBg?: MotionValue<string>
}

const AnimeBgContext = createContext<TAnimeBg>({})

export const AnimeBgContextProvider = AnimeBgContext.Provider

export const useAnimeBgContext = () => useContext(AnimeBgContext)
