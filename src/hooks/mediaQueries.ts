import { useMediaQuery } from '@chakra-ui/react'

const config = { ssr: true, fallback: true }

export const useIsAboveMobile = () => useMediaQuery('(min-width: 512px)', config)
