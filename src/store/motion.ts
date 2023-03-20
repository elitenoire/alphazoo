import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { MOTION_SETTINGS } from '~src/constants'
import { useStoreHydration } from '~src/hooks/useStoreHydration'
import { createSelectors } from './selectors'

export interface MotionState {
  showLearnWelcome: boolean
  allowLearnAlphabetInitialMotion: boolean
  setShowLearnWelcome: (state: boolean) => void
  setAllowLearnAlphabetInitialMotion: (state: boolean) => void
}

export const useMotionStore = createSelectors(
  create<MotionState>()(
    subscribeWithSelector(
      persist(
        (set) => ({
          showLearnWelcome: true,
          allowLearnAlphabetInitialMotion: true,
          setShowLearnWelcome: (state) => set({ showLearnWelcome: state }),
          setAllowLearnAlphabetInitialMotion: (state) =>
            set({ allowLearnAlphabetInitialMotion: state }),
        }),
        {
          name: MOTION_SETTINGS.storeName,
          partialize: ({ showLearnWelcome }) => ({ showLearnWelcome }),
        }
      )
    )
  )
)

export const useMotionHydration = () => {
  return useStoreHydration<MotionState, { showLearnWelcome: boolean }>(useMotionStore)
}
