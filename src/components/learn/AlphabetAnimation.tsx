import NextImage from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useAnimate, useScroll, useMotionValueEvent } from 'framer-motion'
import type { FlexProps, AspectRatioProps } from '@chakra-ui/react'
import { Box, Flex, AspectRatio, forwardRef } from '@chakra-ui/react'
import type { MotionHeadingProps } from '~components/motion'
import { MotionBox, MotionFlex, MotionHeading } from '~components/motion'
import { useGeneralStore } from '~src/store'
import { useIsLargeAndAbove } from '~src/hooks/mediaQueries'

import type { AlphabetType } from '~/types/data'

const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

const threshold = 75

const ShrinkingTitle = forwardRef<MotionHeadingProps, 'h2'>(({ color, children }, ref) => {
  const [isLg] = useIsLargeAndAbove()
  const { scrollY } = useScroll()
  const [shrink, setShrink] = useState(false)

  const syncShrink = useCallback(
    (latest: number) => {
      setShrink(!isLg && latest > threshold)
    },
    [isLg]
  )

  useMotionValueEvent(scrollY, 'change', syncShrink)

  return (
    <MotionHeading
      ref={ref}
      color={color}
      animate={{ fontSize: shrink ? '12.5vw' : '25vw' }}
      initial={{ scale: 0, fontSize: '25vw' }}
      fontFamily="glyph"
      lineHeight={2.5}
      textTransform="none"
    >
      {children}
    </MotionHeading>
  )
})

interface AlphabetAnimationProps extends FlexProps {
  alphabet?: AlphabetType
}

export const AlphabetAnimation = forwardRef<AlphabetAnimationProps, 'div'>(
  ({ alphabet, children, ...rest }, ref) => {
    const allowInitialMotion = useGeneralStore.use.allowLearnAlphabetInitialMotion()
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
          await animateCard(
            cardScope.current,
            { scale: 1, opacity: 1, y: '0%' },
            { duration: 0.35 }
          )
        }
        void enterAnimation()
      }
    }, [animateCard, animateImage, animateLetter, cardScope, imageScope, letterScope, swap])

    return (
      <>
        <Flex
          ref={ref}
          direction={['column', null, null, 'row']}
          rowGap={16}
          pt={[32, null, null, 16]}
          pb={16}
          bg="inherit"
          rounded="inherit"
          {...rest}
        >
          <Flex
            pos="sticky"
            zIndex="max"
            top={0}
            align="center"
            justify="center"
            flex={1}
            h={{ lg: 'calc(100vh - 4em)' }}
            pt={[1, null, null, 0]}
            bg="inherit"
            borderBottomWidth="3px"
            borderBottomStyle="solid"
            borderBottomColor={['blackAlpha.100', null, null, 'transparent']}
          >
            <ShrinkingTitle ref={letterScope} color={alphabet?.color ?? 'inherit'}>
              {title}
            </ShrinkingTitle>
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
          <Flex
            align="center"
            justify="center"
            flex={1}
            overflow="hidden"
            pt={[8, null, null, 16]}
            pb={[28, null, null, 64]}
          >
            <MotionFlex
              ref={cardScope}
              initial={{ scale: 0.5, opacity: 0, y: '10%' }}
              flexDirection="column"
              gap={{ base: 28, '2xl': '4vw' }}
              w="full"
              px={[4, '5%', '10%']}
            >
              {children}
            </MotionFlex>
          </Flex>
        </Flex>
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
      </>
    )
  }
)
