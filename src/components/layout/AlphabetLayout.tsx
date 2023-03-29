import type { PropsWithChildren, ReactElement } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'

import { getLearnLayout } from '~/src/components/layout/DefaultLayout'

export default function AlphabetLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Box py={40}>
        <Flex justify="center" wrap="wrap-reverse" gap={8}>
          <Heading fontSize="f4xl" lineHeight="none" textAlign="right">
            Play A <br /> Game
          </Heading>
          <MotionPop pt={12}>
            <Box w={32} h={32} bg="gray.200" rounded="circle" />
          </MotionPop>
        </Flex>
      </Box>
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  const props = { bg: 'white' }
  return getLearnLayout(<AlphabetLayout>{page}</AlphabetLayout>, props)
}
