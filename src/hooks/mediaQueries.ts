import { useMediaQuery } from '@chakra-ui/react'

const config = { ssr: true, fallback: true }

export const useIsSmallAndAbove = () => useMediaQuery('(min-width: 32em)', config)
export const useIsLargeAndAbove = () => useMediaQuery('(min-width: 62em)', config)
