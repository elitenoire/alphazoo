import { useState, useCallback } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { MotionBox, MotionText, MotionSpan, MagneticBox, MotionFlex } from '~components/motion'
import { SfxButton } from '~components/sfx'

import { ReactComponent as LeftPandaSvg } from '~public/img/bg-panda-l.svg'
import { ReactComponent as RightPandaSvg } from '~public/img/bg-panda-r.svg'

const container: Variants = {
  in: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.6,
      delayChildren: 1.2,
    },
  },
  out: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
}

const appear: Variants = {
  out: (factor: number) => ({
    opacity: 0,
    y: `${factor * 100}%`,
    scale: 0.75,
    transition: { type: 'spring', duration: 0.5 * factor },
  }),
  in: (factor: number) => ({
    opacity: 1,
    scale: 1,
    y: '0%',
    transition: { type: 'spring', duration: 0.5 * factor },
  }),
}

interface StartWelcomeProps {
  onExit: () => void
}

export default function StartWelcome({ onExit }: StartWelcomeProps) {
  const [started, setStarted] = useState(false)
  const handleClick = useCallback(() => {
    setStarted(true)
  }, [])

  return (
    <AnimatePresence onExitComplete={onExit}>
      {!started && (
        <Box pos="absolute" w="full" inset={0}>
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
          <MotionFlex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            minH="full"
            px={4}
            variants={container}
            initial="out"
            animate="in"
            exit="out"
          >
            <Flex
              align="flex-start"
              direction="column"
              gap={3}
              fontFamily="title"
              fontSize={['flg', 'fxl']}
            >
              <MotionSpan
                px={3}
                py={2}
                color="orange.400"
                bg="whiteAlpha.900"
                boxShadow="xl"
                borderRadius="full"
                border="3px solid"
                variants={appear}
                custom={2.75}
                willChange="opacity"
              >
                <Box as="span" fontSize="2xl">
                  Hi!{' '}
                </Box>
              </MotionSpan>
              <MotionSpan
                px={3}
                py={2}
                color="orange.400"
                bg="whiteAlpha.900"
                boxShadow="xl"
                borderRadius="3xl"
                border="3px solid"
                variants={appear}
                custom={2}
                willChange="opacity"
              >
                Our friends are waiting to meet you.
              </MotionSpan>
            </Flex>
            <MotionText
              my={6}
              px={3}
              py={2}
              color="orange.400"
              bg="whiteAlpha.900"
              fontFamily="title"
              fontSize={['flg', 'fxl']}
              boxShadow="2xl"
              borderRadius="3xl"
              border="3px solid"
              variants={appear}
              custom={1}
              willChange="opacity"
            >
              Learn our names while having fun.
            </MotionText>
            <MotionBox variants={appear} custom={1}>
              <MagneticBox>
                <SfxButton colorScheme="orange" onClick={handleClick}>
                  Start
                </SfxButton>
              </MagneticBox>
            </MotionBox>
          </MotionFlex>
        </Box>
      )}
    </AnimatePresence>
  )
}
