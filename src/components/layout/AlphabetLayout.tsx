import NextImage from 'next/image'
import type { PropsWithChildren, ReactElement } from 'react'
import { Box, Flex, Heading, AspectRatio } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'

import { getLearnLayout } from '~/src/components/layout/DefaultLayout'

export default function AlphabetLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Box px={4} py={40}>
        <Flex pos="sticky" top={20} justify="center" wrap="wrap-reverse" gap={8}>
          <Heading flex={1} fontSize="f4xl" lineHeight="none" textAlign="right">
            Play A <br /> Game
          </Heading>
          <Box flex={1} pt={12}>
            <MotionPop>
              <AspectRatio w="40%" minW={44} bg="brand.100" ratio={1} rounded="circle">
                <NextImage src={`/img/cutemk.svg`} alt={`cute monkey`} fill unoptimized />
              </AspectRatio>
            </MotionPop>
          </Box>
        </Flex>
        <Flex wrap="wrap" rowGap={16} columnGap={6} my={40} px={[null, '5%', 0]}>
          <Box
            pos="sticky"
            top={40}
            flex={['1 1 100%', null, 1]}
            h="xs"
            bg="gray.200"
            rounded={['10vw', null, '8vw']}
          />
          <Box
            pos="sticky"
            top={40}
            flex={['1 1 100%', null, 1]}
            h="xs"
            mt={[null, null, 16]}
            bg="gray.200"
            rounded={['10vw', null, '8vw']}
          />
          <Box
            pos="sticky"
            top={40}
            flex={['1 1 100%', null, 1]}
            h="xs"
            bg="gray.200"
            rounded={['10vw', null, '8vw']}
          />
        </Flex>
      </Box>
      <Box h={40} bg="brand.400" />
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  const props = { bg: 'white' }
  return getLearnLayout(<AlphabetLayout>{page}</AlphabetLayout>, props)
}
