import { useCallback } from 'react'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import { useAnimeBgContext } from '~src/context/animeBg'

export function useAnimeBg<V>(value: MotionValue<V>, transformer: (val: V) => string) {
  const { animeBg } = useAnimeBgContext()

  const updateBackground = useCallback(
    (val: V) => {
      animeBg?.set(transformer(val))
    },
    [animeBg, transformer]
  )

  return useMotionValueEvent(value, 'change', updateBackground)
}
