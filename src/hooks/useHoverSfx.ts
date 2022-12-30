import { useCallback } from 'react'
import useSound from 'use-sound'
import { useSoundStore } from '~/src/store'

export default function useHoverSfx(src = './sounds/hover.mp3') {
  const soundEnabled = useSoundStore.use.soundEffects()
  const volume = useSoundStore.use.soundEffectsVolume()

  const [play] = useSound(src, {
    preload: true,
    volume,
    soundEnabled,
  })

  const playOnHover = useCallback(() => {
    play()
  }, [play])

  return playOnHover
}
