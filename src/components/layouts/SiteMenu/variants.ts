import type { Variants } from 'framer-motion'

export const menuOverlay: Variants = {
  in: {
    visibility: 'visible',
    pointerEvents: 'auto',
    clipPath: 'ellipse(150% 110% at 50% 0)',
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
  out: {
    clipPath: 'ellipse(50% 0% at 50% 0)',
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.25 },
    transitionEnd: {
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  },
}

export const menuBarBg: Variants = {
  unfixed: {
    backgroundImage: 'none',
    backgroundSize: 0,
    backdropFilter: 'none',
  },
  fixed: {
    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0) 1px, rgba(0,0,0,0.08) 1px)',
    backgroundSize: '0.2em 0.2em',
    backdropFilter: 'blur(3px)',
  },
}

export const container: Variants = {
  in: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  out: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
}

export const listItem: Variants = {
  in: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  out: { x: '5%', opacity: 0, transition: { duration: 0.3 } },
}

export const faceItem: Variants = {
  in: { y: 0, transition: { duration: 0.3 } },
  out: { y: '100%' },
}
