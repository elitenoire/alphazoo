import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { SOUND_SETTINGS } from '~src/constants'
import { useStoreHydration, StoreWithPersist } from '~src/hooks/useStoreHydration'
import { createSelectors } from './selectors'

interface HydratedState {
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}
export interface SoundState {
  music: boolean
  musicVolume: number
  soundPhonics: boolean
  soundPhonicsVolume: number
  soundEffects: boolean
  soundEffectsVolume: number
  toggleMusic: () => void
  toggleSoundPhonics: () => void
  toggleSoundEffects: () => void
  setMusic: (state: boolean) => void
  setSoundPhonics: (state: boolean) => void
  setSoundEffects: (state: boolean) => void
  setMusicVolume: (volume: number) => void
  setSoundPhonicsVolume: (volume: number) => void
  setSoundEffectsVolume: (volume: number) => void
}

export const useSoundStore = createSelectors(
  create<SoundState & HydratedState>()(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          music: true,
          soundEffects: true,
          soundPhonics: true,
          musicVolume: SOUND_SETTINGS.normalVolumeMusic,
          soundEffectsVolume: SOUND_SETTINGS.normalVolumeSound,
          soundPhonicsVolume: SOUND_SETTINGS.normalVolumeSound,
          toggleMusic: () => set({ music: !get().music }),
          toggleSoundPhonics: () => set({ soundPhonics: !get().soundPhonics }),
          toggleSoundEffects: () => set({ soundEffects: !get().soundEffects }),
          setMusic: (state) => set({ music: state }),
          setSoundPhonics: (state) => set({ soundPhonics: state }),
          setSoundEffects: (state) => set({ soundEffects: state }),
          setMusicVolume: (volume) => set({ musicVolume: volume }),
          setSoundPhonicsVolume: (volume) => set({ soundPhonicsVolume: volume }),
          setSoundEffectsVolume: (volume) => set({ soundEffectsVolume: volume }),
          _hasHydrated: false,
          setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
          name: SOUND_SETTINGS.storeName,
          onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true)
          },
        }
      )
    )
  )
)

export const useSoundHydration = () => {
  return useStoreHydration<SoundState & HydratedState>(useSoundStore)
}
