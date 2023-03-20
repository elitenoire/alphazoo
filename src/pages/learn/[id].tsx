import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AspectRatioProps } from '@chakra-ui/react'
import { Box, Flex, AspectRatio, VisuallyHidden } from '@chakra-ui/react'
import { MotionBox, MotionText } from '~components/motion'
import { useMotionStore } from '~/src/store'

import { getLearnLayout } from '~components/layout/DefaultLayouts'

import { alphabets } from '~/src/data/alphabets'

const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

export default function AlphabetPage({ alphabet }: InferGetStaticPropsType<typeof getStaticProps>) {
  const allowInitialMotion = useMotionStore.use.allowLearnAlphabetInitialMotion()
  const [show, setShow] = useState(true)
  const [swap, setSwap] = useState(false)

  const title = alphabet ? alphabet.name + alphabet.name.toLowerCase() : ''

  const handleComplete = useCallback(() => {
    setShow(false)
    setSwap(true)
  }, [])

  const handleCompleteLayout = useCallback(() => {
    setSwap(false)
  }, [])

  useEffect(() => {
    if (!allowInitialMotion) {
      handleComplete()
    }
  }, [allowInitialMotion, handleComplete])

  return (
    <Box bg={alphabet ? `${alphabet.bg}.100` : 'white'}>
      <VisuallyHidden as="h1">{`Letter ${title}`}</VisuallyHidden>
      <Flex direction={['column', null, null, 'row']} px={4} py={16}>
        <Flex
          pos="sticky"
          top={0}
          align="center"
          justify="center"
          flex={1}
          h={{ lg: 'calc(100vh - 4em)' }}
        >
          <AnimatePresence mode="popLayout">
            {swap ? (
              <MotionBox
                key="image"
                w={{ base: '25%', lg: '50%' }}
                initial={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
              >
                {alphabet && (
                  <MotionAspectRatio
                    layoutId="letter-swap"
                    w="full"
                    ratio={1}
                    // @ts-expect-error from chakra-ui official docs
                    transition={{ duration: 0.6, delay: allowInitialMotion ? 0.5 : 0 }}
                    onLayoutAnimationComplete={handleCompleteLayout}
                  >
                    <NextImage
                      src={`/img/glyphs/${alphabet.name.toUpperCase()}.svg`}
                      alt={`Animal letter ${alphabet.name}`}
                      fill
                      unoptimized
                      priority
                    />
                  </MotionAspectRatio>
                )}
              </MotionBox>
            ) : (
              <MotionText
                key="text"
                fontSize="25vw"
                fontFamily="title"
                color={alphabet?.color ?? 'inherit'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                // @ts-expect-error from chakra-ui official docs
                transition={{ type: 'spring', stiffness: 200, delay: 0.25 }}
              >
                {title}
              </MotionText>
            )}
          </AnimatePresence>
        </Flex>
        <Box flex={1}>
          <Box minH="350px" bg="white" borderRadius="3xl">
            <NextLink href="/learn/t">Ant</NextLink>
          </Box>
          <Box minH="350px" bg="white" borderRadius="3xl">
            <NextLink href="/learn/ijk">Aligator</NextLink>
          </Box>
          <Box minH="350px" bg="white" borderRadius="3xl">
            <NextLink href="/learn/c">Antelope</NextLink>
          </Box>
        </Box>
        <AnimatePresence initial={allowInitialMotion}>
          {show && (
            <Flex pos="fixed" zIndex="zen" align="center" justify="center" inset={0}>
              <MotionBox
                pos="absolute"
                inset={0}
                bg={alphabet?.modalBg ?? 'orange.200'}
                initial={{ x: '0%' }}
                exit={{ x: '100%' }}
                // @ts-expect-error from chakra-ui official docs
                transition={{ duration: 0.4, delay: allowInitialMotion ? 0.55 : 0.05 }}
              />
              {alphabet && (
                <MotionAspectRatio
                  layoutId="letter-swap"
                  w={{ base: '80vmin', lg: '70vmin' }}
                  ratio={1}
                  initial={{ scale: 0.25, opacity: 0 }}
                  animate={{ scale: [null, 1, 1.2, 1], opacity: 1 }}
                  // @ts-expect-error from chakra-ui official docs
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 1.2 },
                  }}
                  onAnimationComplete={handleComplete}
                >
                  <NextImage
                    src={`/img/glyphs/${alphabet.name.toUpperCase()}.svg`}
                    alt={`Animal letter ${alphabet.name}`}
                    fill
                    unoptimized
                    priority
                  />
                </MotionAspectRatio>
              )}
            </Flex>
          )}
        </AnimatePresence>
      </Flex>
    </Box>
  )
}

AlphabetPage.getLayout = getLearnLayout

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = alphabets.map((alphabet) => ({
    params: {
      id: alphabet.name.toLowerCase(),
    },
  }))

  return { paths, fallback: false }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
  const alphabet = alphabets.find((alphabet) => alphabet.name.toLowerCase() === params?.id)

  return { props: { alphabet } }
}
