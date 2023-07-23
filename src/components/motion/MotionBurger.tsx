import { useEffect, useRef } from 'react'
import type { Variants } from 'framer-motion'
import { motion, useAnimationControls } from 'framer-motion'

const topPath: Variants = {
  open: { d: 'M7.1 6.9 L16.9 17.1' },
  middle: { d: 'M5 12 L19 12' },
  closed: { d: 'M5 9.6 L19 9.6' },
}

const bottomPath: Variants = {
  open: { d: 'M7 17 L17 7' },
  middle: { d: 'M5 12 L19 12' },
  closed: { d: 'M5 14.4 L14 14.4' },
}

export const MotionBurger = ({ open }: { open: boolean }) => {
  const topPathMotion = useAnimationControls()
  const bottomPathMotion = useAnimationControls()

  const initialMotionRef = useRef(false)

  useEffect(() => {
    const openSequence = async () => {
      try {
        await Promise.all([topPathMotion.start('middle'), bottomPathMotion.start('middle')])
        await Promise.all([topPathMotion.start('open'), bottomPathMotion.start('open')])
        initialMotionRef.current = true
      } catch (err) {
        console.warn(err)
      }
    }
    const closeSequence = async () => {
      try {
        if (initialMotionRef.current) {
          await Promise.all([topPathMotion.start('middle'), bottomPathMotion.start('middle')])
          await Promise.all([topPathMotion.start('closed'), bottomPathMotion.start('closed')])
        }
      } catch (err) {
        console.warn(err)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    open ? openSequence() : closeSequence()
  }, [bottomPathMotion, open, topPathMotion])

  return (
    <svg viewBox="0 0 24 24">
      <motion.path
        initial="closed"
        animate={topPathMotion}
        variants={topPath}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        initial="closed"
        animate={bottomPathMotion}
        variants={bottomPath}
        transition={{ ease: 'easeInOut', duration: 0.2 }}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
