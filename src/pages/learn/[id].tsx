import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import NextImage from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useAnimate } from 'framer-motion'
import type { AspectRatioProps } from '@chakra-ui/react'
import { Box, Flex, AspectRatio, VisuallyHidden, Heading, Text } from '@chakra-ui/react'
import { MotionBox, MotionFlex, MotionHeading, MotionPop, MagneticBox } from '~components/motion'
import Discovery from '~components/learn/Discovery'
import { useMotionStore } from '~/src/store'

import { getLayout } from '~components/layout/AlphabetLayout'

import { alphabets } from '~/src/data/alphabets'

const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

export default function AlphabetPage({ alphabet }: InferGetStaticPropsType<typeof getStaticProps>) {
  const allowInitialMotion = useMotionStore.use.allowLearnAlphabetInitialMotion()
  const [showOverlay, setShowOverlay] = useState(true)
  const [swap, setSwap] = useState(false)

  const [imageScope, animateImage] = useAnimate()
  const [letterScope, animateLetter] = useAnimate()
  const [cardScope, animateCard] = useAnimate()

  const title = alphabet ? alphabet.name.toUpperCase() + alphabet.name.toLowerCase() : ''

  const handleComplete = useCallback(() => {
    setShowOverlay(false)
  }, [])

  const handleCompleteLayout = useCallback(() => {
    setSwap(true)
  }, [])

  useEffect(() => {
    if (!allowInitialMotion) {
      handleComplete()
    }
  }, [allowInitialMotion, handleComplete])

  useEffect(() => {
    if (swap) {
      const enterAnimation = async () => {
        await animateImage(imageScope.current, { scale: 0, opacity: 0 }, { duration: 0.3 })
        await animateLetter(letterScope.current, { scale: 1 }, { type: 'spring', stiffness: 100 })
        await animateCard(cardScope.current, { scale: 1, opacity: 1, y: '0%' }, { duration: 0.35 })
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      enterAnimation()
    }
  }, [animateCard, animateImage, animateLetter, cardScope, imageScope, letterScope, swap])

  return (
    <Box bg={alphabet ? `${alphabet.bg}.100` : 'white'} roundedBottom="10vw">
      <VisuallyHidden as="h1">{`Alphabet ${alphabet?.name ?? ''}`}</VisuallyHidden>
      <Flex direction={['column', null, null, 'row']} rowGap={16} px={4} py={16} bg="inherit">
        <Flex
          pos="sticky"
          zIndex="max"
          top={0}
          align="center"
          justify="center"
          flex={1}
          h={{ lg: 'calc(100vh - 4em)' }}
          pb={[5, null, null, 0]}
          bg="inherit"
        >
          <MotionHeading
            ref={letterScope}
            color={alphabet?.color ?? 'inherit'}
            fontSize="25vw"
            lineHeight="none"
            initial={{ scale: 0 }}
            fontFamily="title"
          >
            {title}
          </MotionHeading>
          {!showOverlay && (
            <Box ref={imageScope} pos="absolute" w={{ base: '25%', lg: '50%' }}>
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
            </Box>
          )}
        </Flex>
        <Flex align="center" justify="center" flex={1} overflow="hidden">
          <MotionFlex
            ref={cardScope}
            initial={{ scale: 0.5, opacity: 0, y: '10%' }}
            flexDirection="column"
            gap={{ base: 16, '2xl': '4vw' }}
            w="full"
            px={[null, '5%', '10%']}
            pt={[8, null, null, 16]}
          >
            <MotionPop>
              <Box textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
                <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
                  <NextImage
                    className="object-contain"
                    src={`/img/animals/ant.svg`}
                    alt={`Ant`}
                    fill
                    unoptimized
                    priority
                  />
                </Box>
                <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }}>
                  Ant
                </Heading>
              </Box>
            </MotionPop>
            <MotionPop>
              <Box textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
                <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
                  <NextImage
                    className="object-contain"
                    src={`/img/animals/alligator.svg`}
                    alt={`Alligator`}
                    fill
                    unoptimized
                    priority
                  />
                </Box>
                <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }}>
                  Alligator
                </Heading>
              </Box>
            </MotionPop>
            <MotionPop>
              <Box textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
                <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
                  <NextImage
                    className="object-contain"
                    src={`/img/animals/antelope.svg`}
                    alt={`Antelope`}
                    fill
                    unoptimized
                    priority
                  />
                </Box>
                <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }}>
                  Antelope
                </Heading>
              </Box>
            </MotionPop>
          </MotionFlex>
        </Flex>
      </Flex>
      <Discovery alphabet={alphabet} />
      <AnimatePresence initial={allowInitialMotion}>
        {showOverlay && (
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
    </Box>
  )
}

AlphabetPage.getLayout = getLayout

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
