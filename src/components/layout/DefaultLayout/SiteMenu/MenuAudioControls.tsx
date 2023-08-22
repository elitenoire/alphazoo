import type { ComponentType } from 'react'
import { useState, useCallback, useEffect } from 'react'
import {
  Text,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { useSoundStore, useSoundHydration } from '~src/store'
import type { AudioButtonProps } from './MenuAudioButtons'
import { MusicButton, SoundFxButton, SoundPhonicsButton } from './MenuAudioButtons'

interface AudioControlProps {
  id: string
  value: number
  label: string
  control: ComponentType<AudioButtonProps>
  onChangeEnd?: (val: number) => void
}

const AudioControl = ({
  id,
  value: initialValue = 0.5,
  label,
  control: Control,
  onChangeEnd,
}: AudioControlProps) => {
  const hydrated = useSoundHydration()
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback((val: number) => {
    setValue(val)
  }, [])

  const handleChangeEnd = useCallback(
    (val: number) => {
      onChangeEnd?.(val)
    },
    [onChangeEnd]
  )

  useEffect(() => {
    if (hydrated) {
      setValue(initialValue)
    }
  }, [hydrated, initialValue])

  return (
    <Grid
      alignItems="center"
      columnGap={4}
      templateColumns="auto 1fr auto"
      templateAreas={'"icon label value""icon slider value"'}
    >
      <GridItem gridArea="icon">
        <Control label={label} size="lg" iconSize="50%" bg="background" />
      </GridItem>
      <GridItem gridArea="label" id={id}>
        <Text fontWeight={500}>{label}</Text>
      </GridItem>
      <GridItem gridArea="slider">
        {hydrated && (
          <Slider
            aria-labelledby={id}
            colorScheme="secondary"
            max={1}
            onChange={handleChange}
            onChangeEnd={handleChangeEnd}
            step={0.01}
            value={value}
          >
            <SliderTrack h={2} bg="blackAlpha.300" rounded="full">
              <SliderFilledTrack bg="currentColor" />
            </SliderTrack>
            <SliderThumb boxSize={5} />
          </Slider>
        )}
      </GridItem>
      <GridItem gridArea="value">
        <Text align="center" w="3ch" fontSize="f2xl">
          {hydrated ? (value * 100).toFixed() : ''}
        </Text>
      </GridItem>
    </Grid>
  )
}

export const MusicControl = () => {
  const volume = useSoundStore.use.musicVolume()
  const setVolume = useSoundStore.use.setMusicVolume()

  return (
    <AudioControl
      id="music-control"
      value={volume}
      label="Music"
      control={MusicButton}
      onChangeEnd={setVolume}
    />
  )
}

export const SoundPhonicsControl = () => {
  const volume = useSoundStore.use.soundPhonicsVolume()
  const setVolume = useSoundStore.use.setSoundPhonicsVolume()

  return (
    <AudioControl
      id="sound-phonics-control"
      value={volume}
      label="Sound (Phonics)"
      control={SoundPhonicsButton}
      onChangeEnd={setVolume}
    />
  )
}

export const SoundEffectsControl = () => {
  const volume = useSoundStore.use.soundEffectsVolume()
  const setVolume = useSoundStore.use.setSoundEffectsVolume()

  return (
    <AudioControl
      id="sound-effects-control"
      value={volume}
      label="Sound (Effects)"
      control={SoundFxButton}
      onChangeEnd={setVolume}
    />
  )
}
