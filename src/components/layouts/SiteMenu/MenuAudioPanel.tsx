import { memo } from 'react'
import { MotionBox } from '~components/motion'
import { MusicControl, SoundEffectsControl, SoundPhonicsControl } from './MenuAudioControls'
import { ROUTE_2, ROUTE_3, ROUTE_5 } from './routes'
import { container, listItem } from './variants'

const AudioPanel = () => {
  return (
    <MotionBox
      transform={{ lg: 'scale(0.85)' }}
      transformOrigin={{ lg: 'left bottom' }}
      variants={container}
    >
      <MotionBox
        mb={2}
        p={2}
        bg={ROUTE_5.color}
        border="5px solid"
        borderColor="background"
        rounded="full"
        variants={listItem}
      >
        <MusicControl />
      </MotionBox>
      <MotionBox
        mb={2}
        p={2}
        bg={ROUTE_3.color}
        border="5px solid"
        borderColor="background"
        rounded="full"
        variants={listItem}
      >
        <SoundPhonicsControl />
      </MotionBox>
      <MotionBox
        p={2}
        bg={ROUTE_2.color}
        border="5px solid"
        borderColor="background"
        rounded="full"
        variants={listItem}
      >
        <SoundEffectsControl />
      </MotionBox>
    </MotionBox>
  )
}

export const MenuAudioPanel = memo(AudioPanel)
