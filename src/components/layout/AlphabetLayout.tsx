import NextImage from 'next/image'
import type { PropsWithChildren, ReactElement } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { MotionPop, MotionBox } from '~components/motion'
import type { LayoutProps } from '~components/layout/DefaultLayout'
import { getLearnLayout } from '~components/layout/DefaultLayout'

export default function AlphabetLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      {/* <Box px={4} py={40}>
        <Flex pos="sticky" top={20} justify="center" wrap="wrap-reverse" gap={8}>
          <Heading flex={1} fontSize="f4xl" textAlign="right">
            Play A <br /> Game
          </Heading>
          <Box flexGrow={[0, 1]} flexShrink={1} flexBasis={44} pt={12}>
            <MotionPop w={[null, '40%']} minW={[null, 60]}>
              <AspectRatio w="full" bg="brand.100" ratio={1} rounded="circle">
                <NextImage src={`/img/cutemk.svg`} alt={`cute monkey`} fill  />
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
      </Box> */}
      <Flex pos="relative" align="center" justify={['flex-end', 'center']} minH={40} mt={40} px={4}>
        <MotionBox
          pos="absolute"
          top="-100%"
          bottom={0}
          left={4}
          w={{ base: '25%', lg: '10%' }}
          initial={{ y: '50%' }}
          whileInView={{ y: '0%' }}
          // @ts-expect-error from chakra-ui official docs
          transition={{ type: 'spring', duration: 1 }}
        >
          <NextImage className="object-contain object-bottom-l" src={`/img/giff.svg`} alt="" fill />
        </MotionBox>
        <Heading
          as="p"
          py={4}
          color="brand.800"
          fontSize="f4xl"
          textAlign={['right', 'center']}
          textShadow="0.5em -1em rgba(0,0,0,0.3)"
        >
          Have Fun!
        </Heading>
        <MotionPop delay={0.05} pos="absolute" top={0} right={4} bottom={0} w="12.5%">
          <NextImage className="object-contain object-bottom-r" src={`/img/mush.svg`} alt="" fill />
        </MotionPop>
      </Flex>
    </>
  )
}

export const getLayout = (page: ReactElement, props?: LayoutProps) => {
  return getLearnLayout(<AlphabetLayout>{page}</AlphabetLayout>, props)
}
