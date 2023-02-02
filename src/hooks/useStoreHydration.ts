import { useEffect, useState } from 'react'
import type { Mutate, StoreApi, UseBoundStore } from 'zustand'
import type { WithSelectors } from '~src/store/selectors'

export type StoreWithPersist<S> = UseBoundStore<Mutate<StoreApi<S>, [['zustand/persist', S]]>>

/**
 * hooks to check if the value from persisted storage has been hydrated to zustand store
 *
 * @param store StoreWithPersistMiddleware
 * @returns
 */

// export const useStoreHydration = <S>(
export const useStoreHydration = <S, P extends StoreWithPersist<S> = StoreWithPersist<S>>(
  store: WithSelectors<P>
) => {
  const [hydrated, setHydrated] = useState(store.persist.hasHydrated)

  useEffect(() => {
    const unsubFinishHydration = store.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(store.persist.hasHydrated())

    return () => {
      unsubFinishHydration()
    }
  }, [store.persist])

  return hydrated
}
