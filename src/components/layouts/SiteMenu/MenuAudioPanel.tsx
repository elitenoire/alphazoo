import { Variants } from 'framer-motion'
import { MotionBox } from '~components/motion'
import { MusicControl, SoundEffectsControl, SoundPhonicsControl } from './MenuAudioControls'

const container: Variants = {
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

const item: Variants = {
  in: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  out: { x: '5%', opacity: 0, transition: { duration: 0.3 } },
}

interface MenuAudioPanelProps {
  animate: boolean
}

export const MenuAudioPanel = ({ animate }: MenuAudioPanelProps) => {
  return (
    <MotionBox
      transform={{ lg: 'scale(0.9)' }}
      transformOrigin={{ lg: 'left bottom' }}
      initial={false}
      animate={animate ? 'in' : 'out'}
      variants={container}
    >
      <MotionBox
        mb={2}
        p={2}
        bg="green.400"
        border="5px solid"
        borderColor="background"
        rounded="full"
        variants={item}
      >
        <MusicControl />
      </MotionBox>
      <MotionBox
        mb={2}
        p={2}
        bg="pink.200"
        border="5px solid"
        borderColor="background"
        rounded="full"
        variants={item}
      >
        <SoundPhonicsControl />
      </MotionBox>
      <MotionBox
        p={2}
        bg="orange.300"
        border="5px solid"
        borderColor="background"
        rounded="full"
        variants={item}
      >
        <SoundEffectsControl />
      </MotionBox>
    </MotionBox>
  )
}
