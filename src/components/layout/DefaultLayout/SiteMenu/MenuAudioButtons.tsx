import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'
import type { IconButtonProps } from '@chakra-ui/react'
import { IconButton, Box, useToken } from '@chakra-ui/react'
import { MusicBold, VolumeHighBold, VolumeSlashBold } from 'react-iconsax-icons'
import { useSoundHydration, useSoundStore } from '~/src/store'
import { useGeneralSfx } from '~/src/context/sfx'

import { ReactComponent as MusicSlashBold } from '~public/icons/musicslash.svg'
import { ReactComponent as HearingOutline } from '~public/icons/hearing.svg'
import { ReactComponent as HearingSlashOutline } from '~public/icons/hearingslash.svg'

interface MenuIconButtonProps extends Omit<IconButtonProps, 'aria-label'> {
  whenFixed?: boolean
  label?: string
}

interface MenuAudioButtonProps extends MenuIconButtonProps {
  enable?: boolean
  onToggle?: () => void
  iconOn: IconButtonProps['icon']
  iconOff: IconButtonProps['icon']
}

export interface AudioButtonProps extends MenuIconButtonProps {
  iconSize?: string
}

const MenuAudioButton = ({
  label = '',
  whenFixed,
  iconOn,
  iconOff,
  enable: initialEnable,
  onToggle,
  ...rest
}: MenuAudioButtonProps) => {
  const disabledColor = useToken('colors', 'blackAlpha.700', 'rgba(0,0,0,0.65)')
  const [enable, setEnable] = useState(initialEnable ?? true)

  const hydrated = useSoundHydration()
  const { playHover } = useGeneralSfx()

  const toggleAudio = useCallback(() => {
    setEnable((_enable) => !_enable)
    onToggle?.()
  }, [onToggle])

  const ariaLabel = `Turn ${label} ${enable ? 'Off' : 'On'}`.toLowerCase()

  useEffect(() => {
    setEnable((_enable) => initialEnable ?? _enable)
  }, [initialEnable])

  if (!hydrated) {
    return <Box w={10} h={10} bg="blackAlpha.200" rounded="circle" />
  }

  return (
    <motion.div
      initial={false}
      animate={{ rotate: enable ? 360 : 0, transition: { duration: 0.3 } }}
    >
      <IconButton
        color={enable ? 'inherit' : disabledColor}
        bg="transparent"
        _hover={{
          shadow: '0 0 0 5px rgba(255,255,255,0.15)',
          bg: whenFixed ? 'secondary.200' : 'brand.100',
        }}
        _active={{
          bg: whenFixed ? 'secondary.300' : 'brand.200',
          transform: 'scale(0.95)',
        }}
        size="md"
        transitionDuration="0.2s"
        transitionProperty="transform,box-shadow"
        {...rest}
        aria-label={ariaLabel}
        onClick={toggleAudio}
        onMouseEnter={playHover}
        title={ariaLabel}
      >
        {enable ? iconOn : iconOff}
      </IconButton>
    </motion.div>
  )
}

export const MusicButton = ({ iconSize = '65%', label = 'Music', ...rest }: AudioButtonProps) => {
  const enable = useSoundStore.use.music()
  const toggle = useSoundStore.use.toggleMusic()
  const setEnable = useSoundStore.use.setMusic()

  const soundVolume = useSoundStore.use.musicVolume()
  const setSoundVolume = useSoundStore.use.setMusicVolume()

  const prevVolumeRef = useRef(soundVolume)

  const volume = useSoundStore.use.soundEffectsVolume()

  const [playOff] = useSound('/sounds/music-off.mp3', { volume })
  const [playOn] = useSound('/sounds/music-on.mp3', { volume })

  const handleToggle = useCallback(() => {
    if (enable) {
      playOff()
      setSoundVolume(0)
    } else {
      playOn()
      setSoundVolume(prevVolumeRef.current)
    }
    toggle()
  }, [enable, playOff, playOn, setSoundVolume, toggle])

  useEffect(() => {
    if (soundVolume) {
      prevVolumeRef.current = soundVolume
      setEnable(true)
    } else {
      setEnable(false)
    }
  }, [setEnable, soundVolume])

  return (
    <MenuAudioButton
      enable={enable}
      onToggle={handleToggle}
      label={label}
      iconOn={<MusicBold color="currentColor" size={iconSize} />}
      iconOff={<MusicSlashBold fill="currentColor" width={iconSize} height={iconSize} />}
      {...rest}
    />
  )
}

export const SoundFxButton = ({
  iconSize = '65%',
  label = 'Sounds',
  ...rest
}: AudioButtonProps) => {
  const enable = useSoundStore.use.soundEffects()
  const toggle = useSoundStore.use.toggleSoundEffects()
  const setEnable = useSoundStore.use.setSoundEffects()

  const soundVolume = useSoundStore.use.soundEffectsVolume()
  const setSoundVolume = useSoundStore.use.setSoundEffectsVolume()

  const prevVolumeRef = useRef(soundVolume)

  const volume = soundVolume || prevVolumeRef.current

  const [playOff] = useSound('/sounds/sfx-off.mp3', { volume })
  const [playOn] = useSound('/sounds/sfx-on.mp3', { volume })

  const handleToggle = useCallback(() => {
    if (enable) {
      playOff()
      setSoundVolume(0)
    } else {
      playOn()
      setSoundVolume(prevVolumeRef.current)
    }
    toggle()
  }, [enable, playOff, playOn, setSoundVolume, toggle])

  useEffect(() => {
    if (soundVolume) {
      prevVolumeRef.current = soundVolume
      setEnable(true)
    } else {
      setEnable(false)
    }
  }, [setEnable, soundVolume])

  return (
    <MenuAudioButton
      enable={enable}
      onToggle={handleToggle}
      label={label}
      iconOn={<VolumeHighBold color="currentColor" size={iconSize} />}
      iconOff={<VolumeSlashBold color="currentColor" size={iconSize} />}
      {...rest}
    />
  )
}

export const SoundPhonicsButton = ({
  iconSize = '65%',
  label = 'Sounds',
  ...rest
}: AudioButtonProps) => {
  const enable = useSoundStore.use.soundPhonics()
  const toggle = useSoundStore.use.toggleSoundPhonics()
  const setEnable = useSoundStore.use.setSoundPhonics()

  const soundVolume = useSoundStore.use.soundPhonicsVolume()
  const setSoundVolume = useSoundStore.use.setSoundPhonicsVolume()

  const prevVolumeRef = useRef(soundVolume)

  const volume = useSoundStore.use.soundEffectsVolume()

  const [playOff] = useSound('/sounds/sfx-off.mp3', { volume })
  const [playOn] = useSound('/sounds/sfx-on.mp3', { volume })

  const handleToggle = useCallback(() => {
    if (enable) {
      playOff()
      setSoundVolume(0)
    } else {
      playOn()
      setSoundVolume(prevVolumeRef.current)
    }
    toggle()
  }, [enable, playOff, playOn, setSoundVolume, toggle])

  useEffect(() => {
    if (soundVolume) {
      prevVolumeRef.current = soundVolume
      setEnable(true)
    } else {
      setEnable(false)
    }
  }, [setEnable, soundVolume])

  return (
    <MenuAudioButton
      enable={enable}
      onToggle={handleToggle}
      label={label}
      iconOn={<HearingOutline fill="currentColor" width={iconSize} height={iconSize} />}
      iconOff={<HearingSlashOutline fill="currentColor" width={iconSize} height={iconSize} />}
      {...rest}
    />
  )
}
