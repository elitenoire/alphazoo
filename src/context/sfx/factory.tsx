import { createContext, useContext, PropsWithChildren } from 'react'
import { useCreateSfx, SFX, ContextSFX } from '~/src/hooks/useCreateSfx'

const createSfxContext = <T extends SFX<T>>() => {
  return createContext<ContextSFX<T | undefined> | null>(null)
}

const createSfxContextProvider = <T extends SFX<T>>(
  SfxContext: ReturnType<typeof createSfxContext<T>>
) => {
  return SfxContext.Provider
}

const createUseSfx = <T extends SFX<T>>(SfxContext: ReturnType<typeof createSfxContext<T>>) => {
  return () => {
    const context = useContext(SfxContext)
    if (!context) throw new Error('Missing SfxContext.Provider in the tree')
    return context
  }
}

export const createSfxProvider = <T extends SFX<T>>() => {
  const SfxContext = createSfxContext<T>()
  const SfxContextProvider = createSfxContextProvider(SfxContext)
  const useSfx = createUseSfx(SfxContext)

  const SfxProvider = ({ children, sfx }: PropsWithChildren<{ sfx?: T }>) => {
    const { createSfxValue } = useCreateSfx()

    const value = createSfxValue(sfx)

    return <SfxContextProvider value={value}>{children}</SfxContextProvider>
  }

  return [SfxProvider, useSfx] as const
}
