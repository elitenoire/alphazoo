import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { SOUND_SETTINGS } from '~src/constants'
import { useStoreHydration } from '~src/hooks/useStoreHydration'
import { createSelectors } from './selectors'

export interface SoundState {
  music: boolean
  musicVolume: number
  musicPrevVolume: number
  soundPhonics: boolean
  soundPhonicsVolume: number
  soundPhonicsPrevVolume: number
  soundEffects: boolean
  soundEffectsVolume: number
  soundEffectsPrevVolume: number
  toggleMusic: (state: boolean) => void
  toggleSoundPhonics: (state: boolean) => void
  toggleSoundEffects: (state: boolean) => void
  setMusicVolume: (volume: number) => void
  setSoundPhonicsVolume: (volume: number) => void
  setSoundEffectsVolume: (volume: number) => void
}

export const useSoundStore = createSelectors(
  create<SoundState>()(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          music: true,
          soundEffects: true,
          soundPhonics: true,
          musicVolume: SOUND_SETTINGS.normalVolumeMusic,
          soundEffectsVolume: SOUND_SETTINGS.normalVolumeSound,
          soundPhonicsVolume: SOUND_SETTINGS.normalVolumeSound,
          musicPrevVolume: SOUND_SETTINGS.normalVolumeMusic,
          soundEffectsPrevVolume: SOUND_SETTINGS.normalVolumeSound,
          soundPhonicsPrevVolume: SOUND_SETTINGS.normalVolumeSound,
          toggleMusic: (state) =>
            set({
              music: state,
              musicVolume: state ? get().musicPrevVolume : SOUND_SETTINGS.muteVolume,
            }),
          toggleSoundPhonics: (state) =>
            set({
              soundPhonics: state,
              soundPhonicsVolume: state ? get().soundPhonicsPrevVolume : SOUND_SETTINGS.muteVolume,
            }),
          toggleSoundEffects: (state) =>
            set({
              soundEffects: state,
              soundEffectsVolume: state ? get().soundEffectsPrevVolume : SOUND_SETTINGS.muteVolume,
            }),
          setMusicVolume: (volume) =>
            set({
              musicVolume: volume,
              musicPrevVolume: volume || get().musicPrevVolume,
              music: !!volume,
            }),
          setSoundPhonicsVolume: (volume) =>
            set({
              soundPhonicsVolume: volume,
              soundPhonicsPrevVolume: volume || get().soundPhonicsPrevVolume,
              soundPhonics: !!volume,
            }),
          setSoundEffectsVolume: (volume) =>
            set({
              soundEffectsVolume: volume,
              soundEffectsPrevVolume: volume || get().soundEffectsPrevVolume,
              soundEffects: !!volume,
            }),
        }),
        {
          name: SOUND_SETTINGS.storeName,
        }
      )
    )
  )
)

export const useSoundHydration = () => {
  return useStoreHydration<SoundState>(useSoundStore)
}
