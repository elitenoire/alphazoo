import NextImage from 'next/image'
import { useState, useCallback, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useAnimate,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import type { FlexProps, AspectRatioProps } from '@chakra-ui/react'
import { Box, Flex, AspectRatio, forwardRef } from '@chakra-ui/react'
import type { MotionHeadingProps } from '~components/motion'
import { MotionBox, MotionHeading } from '~components/motion'
import { useGeneralStore } from '~src/store'
import { useIsLargeAndAbove } from '~src/hooks/mediaQueries'

import type { AlphabetType } from '~/types/data'

const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

const threshold = 5

const ShrinkingTitle = ({ color, children }: MotionHeadingProps) => {
  const [isLg] = useIsLargeAndAbove()
  const { scrollY } = useScroll()

  const [titleScope, animateTitle] = useAnimate()

  const [shrink, setShrink] = useState(false)
  const [isShrinking, setIsShrinking] = useState(false)

  const syncShrink = useCallback(
    (latest: number) => {
      setShrink(!isLg && latest > threshold)
    },
    [isLg]
  )

  useMotionValueEvent(scrollY, 'change', syncShrink)

  useEffect(() => {
    const shrinkAnimation = async () => {
      try {
        setIsShrinking(true)
        await animateTitle(
          titleScope.current,
          { fontSize: shrink ? '12.5vw' : '25vw' },
          { type: 'spring', duration: 1 }
        )
        setIsShrinking(false)
      } catch (err) {
        console.warn(err)
      }
    }

    if (!isShrinking) {
      void shrinkAnimation()
    }
  }, [animateTitle, isShrinking, shrink, titleScope])

  return (
    <MotionHeading
      ref={titleScope}
      color={color}
      initial={{ fontSize: '25vw' }}
      fontFamily="glyph"
      lineHeight={2.5}
      textTransform="none"
      // style={{ fontSize }}
      // {...(isLg && { style: { fontSize } })}
    >
      {children}
    </MotionHeading>
  )
}

interface AlphabetEnterAnimationProps extends FlexProps {
  alphabet?: AlphabetType
}

export const AlphabetEnterAnimation = forwardRef<AlphabetEnterAnimationProps, 'div'>(
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
            zIndex={1}
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
            <MotionBox ref={letterScope} initial={{ scale: 0 }}>
              <ShrinkingTitle color={alphabet?.color ?? 'inherit'}>{title}</ShrinkingTitle>
            </MotionBox>
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
                      priority
                    />
                  </MotionAspectRatio>
                )}
              </Box>
            )}
          </Flex>
          <Box flex={1} overflow="hidden" pt={[8, null, null, 16]} pb={[28, null, null, 64]}>
            <MotionBox ref={cardScope} initial={{ scale: 0.5, opacity: 0, y: '10%' }}>
              {children}
            </MotionBox>
          </Box>
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
