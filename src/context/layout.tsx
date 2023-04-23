import type { PropsWithChildren } from 'react'
import { createContext, useContext, useMemo } from 'react'
import type { RoutePath } from '~src/constants'

interface LayoutContextProps {
  threshold?: number
  back?: RoutePath
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined)

export const LayoutProvider = ({
  threshold = 100,
  back,
  children,
}: PropsWithChildren<LayoutContextProps>) => {
  const value = useMemo(() => ({ threshold, back }), [threshold, back])
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)

  if (!context) throw new Error('Missing LayoutContext.Provider in the tree')

  return context
}
