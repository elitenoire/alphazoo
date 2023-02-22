import NextLink from 'next/link'
import NextImage from 'next/future/image'
import { useState, useCallback } from 'react'
import { Flex, Box, Heading, List, ListItem, AspectRatio, SlideFade } from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { MotionBox, MotionText, MotionSpan, MagneticBox, MotionFlex } from '~components/motion'
import { SfxButton, SfxLink } from '~components/sfx'
import { getLearnLayout } from '~components/layout/DefaultLayouts'
import { ROUTES } from '~src/constants'

import { ReactComponent as LeftPandaSvg } from '~public/img/bg-panda-l.svg'
import { ReactComponent as RightPandaSvg } from '~public/img/bg-panda-r.svg'
import ImgTrunks from '~public/img/bg-trunks.svg'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

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
      staggerChildren: 0.35,
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

const list: Variants = {
  in: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  out: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
}

const item: Variants = {
  in: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35 },
  },
  out: {
    opacity: 0,
    scale: 0.4,
    transition: { duration: 0.3 },
  },
}

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function Learn() {
  const [start, setStart] = useState(false)
  const [gridReady, setGridReady] = useState(false)

  const handleClick = useCallback(() => {
    setStart(true)
  }, [])

  const handleExit = useCallback(() => {
    setGridReady(true)
  }, [])

  return (
    <Box pos="relative" overflow="hidden" {...(!gridReady && { h: '100vh', minH: '31.25em' })}>
      <Box pos="absolute" w="full" inset={0}>
        <NextImage className="object-cover" fill src={ImgTrunks} alt="" unoptimized />
      </Box>
      <AnimatePresence>
        {!start && (
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
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!start && (
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
        )}
      </AnimatePresence>
      <AnimatePresence onExitComplete={handleExit}>
        {!start && (
          <MotionFlex
            pos="relative"
            zIndex={1}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            w="full"
            h="inherit"
            px={4}
            variants={container}
            initial="out"
            animate="in"
            exit="out"
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
                custom={2.75}
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
                custom={2}
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
              custom={1}
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
        )}
      </AnimatePresence>
      <AnimatePresence>
        {start && gridReady && (
          <Box pos="relative" zIndex={1} px={8} py={16}>
            <SlideFade in>
              <Heading textAlign="center">
                Learn the{' '}
                <Box
                  as="span"
                  p={1}
                  color="orange.500"
                  fontSize="xl"
                  lineHeight="none"
                  bg="yellow.200"
                  borderRadius="full"
                >
                  26
                </Box>{' '}
                Alphabets
              </Heading>
            </SlideFade>
            <MotionList
              display="grid"
              sx={{
                '--gap': '1.25em',
                '--size': '6.25em',
                '--max-column': '9',
              }}
              placeContent="center"
              pt={8}
              gap="var(--gap)"
              gridAutoRows="var(--size)"
              gridTemplateColumns="repeat(auto-fit, min(max(100% / var(--max-column) - var(--gap), var(--size)), 100%))"
              variants={list}
              initial="out"
              animate="in"
            >
              {alphabets.map((alphabet, idx) => (
                <MotionListItem
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.1,
                    transition: { type: 'spring', duration: 0.2, stiffness: 200 },
                  }}
                  variants={item}
                >
                  <NextLink href={`${ROUTES.learn}/${alphabet}`} passHref>
                    <SfxLink
                      display="flex"
                      position="relative"
                      justifyContent="center"
                      bg="orange.100"
                      h="full"
                      borderRadius="md"
                      p={2}
                    >
                      <AspectRatio w="100%" ratio={1}>
                        <NextImage
                          src={`./img/glyphs/${alphabet.toUpperCase()}.svg`}
                          alt={`Animal letter ${alphabet}`}
                          fill
                          unoptimized
                        />
                      </AspectRatio>
                    </SfxLink>
                  </NextLink>
                </MotionListItem>
              ))}
            </MotionList>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

Learn.getLayout = getLearnLayout
