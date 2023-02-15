import NextImage from 'next/future/image'
import { Flex, Box, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { MotionBox, MotionPop, MagneticBox } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { getLearnLayout } from '~components/layout/DefaultLayouts'

import ImgTrunks from '~public/img/bg-trunks.svg'
import { ReactComponent as LeftPandaSvg } from '~public/img/bg-panda-l.svg'
import { ReactComponent as RightPandaSvg } from '~public/img/bg-panda-r.svg'

export default function Learn() {
  return (
    <Box pos="relative" overflow="hidden" h="100vh">
      <Box pos="absolute" w="full" h="inherit">
        <NextImage className="object-cover" fill src={ImgTrunks} alt="" unoptimized />
      </Box>
      <AnimatePresence>
        <MotionBox
          pos="absolute"
          w={['50%', null, null, '45%']}
          left={0}
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-100%' }}
          // @ts-expect-error from chakra-ui official docs
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <LeftPandaSvg />
        </MotionBox>
        <MotionBox
          pos="absolute"
          w={['40%', null, null, '30%']}
          right={2}
          bottom={0}
          initial={{ y: '100%' }}
          animate={{ y: '45%' }}
          exit={{ y: '100%' }}
          // @ts-expect-error from chakra-ui official docs
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <RightPandaSvg />
        </MotionBox>
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
            <Box as="span" px={3} py={2} color="orange.500" bg="yellow.200" borderRadius="full">
              <Box as="span" fontSize="2xl">
                Hi!{' '}
              </Box>
            </Box>
            <Box as="span" px={3} py={2} color="orange.500" bg="yellow.200" borderRadius="3xl">
              Our friends are waiting to meet you.
            </Box>
          </Flex>
          <Text
            my={6}
            px={3}
            py={2}
            color="orange.500"
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
      </AnimatePresence>
    </Box>
  )
}

Learn.getLayout = getLearnLayout
