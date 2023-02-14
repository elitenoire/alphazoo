import { Flex, Box, Text, chakra } from '@chakra-ui/react'
import { MotionPop, MagneticBox } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { getLearnLayout } from '~components/layout/DefaultLayouts'

import { ReactComponent as LeftPandaSvg } from '~public/img/bg-panda-l.svg'
import { ReactComponent as RightPandaSvg } from '~public/img/bg-panda-r.svg'

const ChakraLeftPanda = chakra(LeftPandaSvg)
const ChakraRightPanda = chakra(RightPandaSvg)

export default function Learn() {
  return (
    <Box pos="relative" overflow="hidden" h="100vh">
      <ChakraLeftPanda pos="absolute" w={['50%', null, null, '45%']} left={0} />
      <ChakraRightPanda
        pos="absolute"
        w={['40%', null, null, '30%']}
        right={2}
        bottom={0}
        translateY="45%"
        transform="auto"
      />
      <Flex
        pos="relative"
        zIndex={1}
        align="center"
        justify="center"
        direction="column"
        w="full"
        h="inherit"
        px={4}
      >
        <Flex
          as="p"
          align="flex-start"
          direction="column"
          gap={1}
          fontFamily="title"
          fontSize={['flg', 'fxl']}
        >
          <Box as="span" px={3} py={2} color="orange.300" bg="yellow.200" borderRadius="full">
            <Box as="span" fontSize="2xl">
              Hi!{' '}
            </Box>
          </Box>
          <Box as="span" px={3} py={2} color="orange.300" bg="yellow.200" borderRadius="3xl">
            Our friends are waiting to meet you.
          </Box>
        </Flex>
        <Text
          my={6}
          px={3}
          py={2}
          color="orange.300"
          fontFamily="title"
          fontSize={['flg', 'fxl']}
          bg="yellow.200"
          borderRadius="3xl"
        >
          Learn our names while having fun.
        </Text>
        <MotionPop delay={0.2}>
          <MagneticBox>
            <SfxButton colorScheme="orange">Start</SfxButton>
          </MagneticBox>
        </MotionPop>
      </Flex>
    </Box>
  )
}

Learn.getLayout = getLearnLayout
