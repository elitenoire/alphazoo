import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { GENERAL_SETTINGS } from '~src/constants'
import { useStoreHydration } from '~src/hooks/useStoreHydration'
import { createSelectors } from './selectors'

export interface GeneralState {
  showLearnIntro: boolean
  allowLearnAlphabetInitialMotion: boolean
  lastViewedWiki: string | null
  setShowLearnIntro: (state: boolean) => void
  setAllowLearnAlphabetInitialMotion: (state: boolean) => void
  setLastViewedWiki: (state: string | null) => void
}

export const useGeneralStore = createSelectors(
  create<GeneralState>()(
    subscribeWithSelector(
      persist(
        (set) => ({
          showLearnIntro: true,
          allowLearnAlphabetInitialMotion: true,
          lastViewedWiki: null,
          setShowLearnIntro: (state) => set({ showLearnIntro: state }),
          setAllowLearnAlphabetInitialMotion: (state) =>
            set({ allowLearnAlphabetInitialMotion: state }),
          setLastViewedWiki: (state) => set({ lastViewedWiki: state }),
        }),
        {
          name: GENERAL_SETTINGS.storeName,
          partialize: ({ showLearnIntro }) => ({ showLearnIntro }),
        }
      )
    )
  )
)

export const useGeneralHydration = () => {
  return useStoreHydration<GeneralState, { showLearnIntro: boolean }>(useGeneralStore)
}
