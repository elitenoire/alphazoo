import useSound from 'use-sound'
import { useSoundStore } from '~src/store'

export function usePhonics(src: string) {
  const soundEnabled = useSoundStore.use.soundPhonics()
  const volume = useSoundStore.use.soundPhonicsVolume()

  return useSound(src, {
    preload: true,
    interrupt: true,
    volume,
    soundEnabled,
  })
}
