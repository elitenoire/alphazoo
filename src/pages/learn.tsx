import NextImage from 'next/future/image'
import { useState, useCallback } from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { MotionBox, MotionText, MotionSpan, MotionPop, MagneticBox } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { getLearnLayout } from '~components/layout/DefaultLayouts'

import ImgTrunks from '~public/img/bg-trunks.svg'
import { ReactComponent as LeftPandaSvg } from '~public/img/bg-panda-l.svg'
import { ReactComponent as RightPandaSvg } from '~public/img/bg-panda-r.svg'

interface CustomVariantProps {
  factor: number
  delay?: number
}

const appear: Variants = {
  out: ({ factor }: CustomVariantProps) => ({
    opacity: 0,
    y: `${factor * 100}%`,
    // scale: factor ?? 0.4,
  }),
  in: ({ delay, factor }: CustomVariantProps) => ({
    opacity: 1,
    // scale: 1,
    y: '0%',
    transition: { type: 'spring', duration: 0.5 * factor, delay },
  }),
}

export default function Learn() {
  const [start, setStart] = useState(false)

  const handleClick = useCallback(() => {
    setStart(true)
  }, [])

  return (
    <Box pos="relative" overflow="hidden" h="100vh">
      <Box pos="absolute" w="full" h="inherit">
        <NextImage className="object-cover" fill src={ImgTrunks} alt="" unoptimized />
      </Box>
      <AnimatePresence>
        {!start && (
          <>
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
                <MotionSpan
                  px={3}
                  py={2}
                  color="orange.500"
                  bg="yellow.200"
                  borderRadius="full"
                  variants={appear}
                  initial="out"
                  animate="in"
                  custom={{ factor: 2.75, delay: 1.2 }}
                >
                  <Box as="span" fontSize="2xl">
                    Hi!{' '}
                  </Box>
                </MotionSpan>
                <MotionSpan
                  px={3}
                  py={2}
                  color="orange.500"
                  bg="yellow.200"
                  borderRadius="3xl"
                  variants={appear}
                  initial="out"
                  animate="in"
                  custom={{ factor: 2, delay: 1.8 }}
                >
                  Our friends are waiting to meet you.
                </MotionSpan>
              </Flex>
              <MotionText
                my={6}
                px={3}
                py={2}
                color="orange.500"
                fontFamily="title"
                fontSize={['flg', 'fxl']}
                bg="yellow.200"
                borderRadius="3xl"
                variants={appear}
                initial="out"
                animate="in"
                custom={{ factor: 1, delay: 2.4 }}
              >
                Learn our names while having fun.
              </MotionText>
              <MotionBox
                variants={appear}
                initial="out"
                animate="in"
                custom={{ factor: 1, delay: 3 }}
              >
                <MagneticBox>
                  <SfxButton colorScheme="orange" onClick={handleClick}>
                    Start
                  </SfxButton>
                </MagneticBox>
              </MotionBox>
            </Flex>
          </>
        )}
      </AnimatePresence>
    </Box>
  )
}

Learn.getLayout = getLearnLayout
