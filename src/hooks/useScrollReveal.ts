import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { useTransform, useScroll, useSpring } from 'framer-motion'

type UseScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>

interface scrollRevealOptions {
  offset?: UseScrollOptions['offset']
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  offset = ['start 0.8', '0.8 start'],
}: scrollRevealOptions = {}) {
  const ref = useRef<T | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>
  const scale = useTransform(yScroll, [0, 0.2], [0.875, 1])
  const opacity = useTransform(yScroll, [0, 0.05], [0, 1])

  return { scrollReveal: { ref, style: { scale, opacity } }, scrollYProgress }
}
