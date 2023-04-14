import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { GENERAL_SETTINGS } from '~src/constants'
import { useStoreHydration } from '~src/hooks/useStoreHydration'
import { createSelectors } from './selectors'

export interface GeneralState {
  showLearnWelcome: boolean
  allowLearnAlphabetInitialMotion: boolean
  setShowLearnWelcome: (state: boolean) => void
  setAllowLearnAlphabetInitialMotion: (state: boolean) => void
}

export const useGeneralStore = createSelectors(
  create<GeneralState>()(
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
          name: GENERAL_SETTINGS.storeName,
          partialize: ({ showLearnWelcome }) => ({ showLearnWelcome }),
        }
      )
    )
  )
)

export const useGeneralHydration = () => {
  return useStoreHydration<GeneralState, { showLearnWelcome: boolean }>(useGeneralStore)
}
