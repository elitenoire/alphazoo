import type { Variants } from 'framer-motion'

export const Animations: Variants = {
  out: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: { delay: 0.45 },
  },
  shake: (d: -1 | 1) => ({
    rotate: [0, 8 * d, -8 * d, 0],
    transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.5 },
  }),
  pulse: (d: number) => ({
    scale: [1, 1.1, 1, 1.2, 1, 1.1, 1],
    transition: { repeat: Infinity, duration: 4, delay: d || 0 },
  }),
  spin: (d: -1 | 1) => ({
    rotate: 360 * d,
    transition: { repeat: Infinity, repeatType: 'reverse', duration: 6 },
  }),
  move: (d: number) => ({
    x: ['0%', '75%', '-50%', '0%'],
    transition: { repeat: Infinity, duration: 5, delay: d || 0 },
  }),
}

const SET_SHAKE = {
  left: {
    img: 'mm-shake-1.svg',
    animate: 'shake',
    props: {
      width: '50%',
      height: '50%',
      left: '-20%',
      bottom: 0,
      custom: 1,
    },
  },
  right: {
    img: 'mm-shake-2.svg',
    animate: 'shake',
    props: {
      width: '50%',
      height: '50%',
      right: '-20%',
      bottom: 0,
      custom: -1,
    },
  },
}

const SET_PULSE = {
  left: {
    img: 'mm-floral-1.svg',
    animate: 'pulse',
    props: {
      left: '-20%',
      bottom: 0,
    },
  },
  right: {
    img: 'mm-floral-2.svg',
    animate: 'pulse',
    props: {
      right: '-20%',
      bottom: 0,
      custom: 0.1,
    },
  },
}

const SET_SPIN = {
  left: {
    img: 'mm-spiral-1.svg',
    animate: 'spin',
    props: {
      left: '-10%',
      bottom: 0,
      custom: 1,
    },
  },
  right: {
    img: 'mm-spiral-2.svg',
    animate: 'spin',
    props: {
      right: '-10%',
      top: 0,
      custom: -1,
    },
  },
}

const SET_MOVE = {
  left: {
    img: 'mm-static-1.svg',
    animate: '',
    props: {
      width: '100%',
      height: '50%',
      left: '-50%',
      bottom: 0,
    },
  },
  right: {
    img: 'mm-spiral-2.svg',
    animate: 'move',
    props: {
      right: '-20%',
      top: 0,
    },
  },
}

const SET_MOVE_ALT = {
  left: {
    img: 'mm-static-2.svg',
    animate: '',
    props: {
      width: '100%',
      height: '50%',
      left: '-50%',
      bottom: 0,
    },
  },
  right: {
    img: 'mm-shift.svg',
    animate: 'move',
    props: {
      width: '50%',
      right: '-20%',
      top: 0,
    },
  },
}

export const settings = [SET_SHAKE, SET_PULSE, SET_SPIN, SET_MOVE, SET_MOVE_ALT]
