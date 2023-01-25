import { useEffect } from 'react'
import useSound from 'use-sound'
import { useSoundStore } from '~/src/store'

export function useBackgroundMusic(src: string) {
  const soundEnabled = useSoundStore.use.music()
  const soundVolume = useSoundStore.use.musicVolume()

  const [play, { pause, stop }] = useSound(src, {
    preload: true,
    loop: true,
    interrupt: true,
    volume: soundVolume,
    soundEnabled,
  })

  useEffect(() => {
    if (soundEnabled) {
      play()
    } else {
      pause()
    }

    return () => {
      stop()
    }
  }, [pause, play, stop, soundEnabled])
}
