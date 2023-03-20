import { useEffect, useState } from 'react'
import type { Mutate, StoreApi, UseBoundStore } from 'zustand'
import type { WithSelectors } from '~src/store/selectors'

export type StoreWithPersist<S, Ps = S> = UseBoundStore<
  Mutate<StoreApi<S>, [['zustand/persist', Ps]]>
>

/**
 * hooks to check if the value from persisted storage has been hydrated to zustand store
 *
 * @param store StoreWithPersist
 * @returns
 */

export const useStoreHydration = <S, Ps = S>(store: WithSelectors<StoreWithPersist<S, Ps>>) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const unsubFinishHydration = store.persist.onFinishHydration(() => setHydrated(true))

    setHydrated(store.persist.hasHydrated())

    return () => {
      unsubFinishHydration()
    }
  }, [store.persist])

  return hydrated
}
