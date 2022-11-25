import { useState, useCallback } from 'react'
import {
  Text,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { MusicButton, SoundsButton, AudioButtonProps } from './MenuAudioButtons'

interface AudioControlProps {
  id: string
  initialValue: number
  label: string
  control: (props: AudioButtonProps) => JSX.Element
  onChangeEnd?: (val: number) => void
}

const AudioControl = ({
  id,
  initialValue,
  label,
  control: Control,
  onChangeEnd,
}: AudioControlProps) => {
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

  return (
    <Grid
      alignItems="center"
      columnGap={4}
      templateColumns="auto 1fr auto"
      templateAreas={'"icon label value""icon slider value"'}
    >
      <GridItem gridArea="icon">
        <Control label={label} whenFixed={true} size="lg" iconSize="50%" bg="background" />
      </GridItem>
      <GridItem gridArea="label" id={id}>
        <Text fontWeight={500}>{label}</Text>
      </GridItem>
      <GridItem gridArea="slider">
        <Slider
          aria-labelledby={id}
          colorScheme="secondary"
          onChange={handleChange}
          onChangeEnd={handleChangeEnd}
        >
          <SliderTrack h={2} bg="blackAlpha.300" rounded="full">
            <SliderFilledTrack bg="currentColor" />
          </SliderTrack>
          <SliderThumb boxSize={5} />
        </Slider>
      </GridItem>
      <GridItem gridArea="value">
        <Text align="center" w="3ch" fontSize="f2xl">
          {value}
        </Text>
      </GridItem>
    </Grid>
  )
}

export const MusicControl = () => {
  return <AudioControl id="music-control" initialValue={30} label="Music" control={MusicButton} />
}

export const SoundPhonicsControl = () => {
  return (
    <AudioControl
      id="sound-phonics-control"
      initialValue={30}
      label="Sound (Phonics)"
      control={SoundsButton}
    />
  )
}

export const SoundEffectsControl = () => {
  return (
    <AudioControl
      id="sound-effects-control"
      initialValue={30}
      label="Sound (Effects)"
      control={SoundsButton}
    />
  )
}
