import type { PropsWithChildren, ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

import { getLearnLayout } from '~/src/components/layout/DefaultLayout'

export default function AlphabetLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Box py={20}>ALPHABET LAYOUT</Box>
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  return getLearnLayout(<AlphabetLayout>{page}</AlphabetLayout>)
}
