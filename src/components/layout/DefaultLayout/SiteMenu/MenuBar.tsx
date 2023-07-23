import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { BackSquareBold } from 'react-iconsax-icons'
import { useAnimationControls, useScroll, useVelocity, AnimatePresence } from 'framer-motion'
import { Box, Flex, useToken, useModalContext } from '@chakra-ui/react'
import { MotionFlex, MotionBox, MotionSpan, MotionBurger } from '~components/motion'
import { SfxLink, SfxButton } from '~components/sfx'
import { useLayoutContext } from '~src/context/layout'
import { ROUTES, SITE_CONFIG } from '~src/constants'

import { MusicButton, SoundFxButton } from './MenuAudioButtons'
import { menuBarBg } from './variants'

import { ReactComponent as LogoSvg } from '~public/brand/logo.svg'
import { ReactComponent as LogonameSvg } from '~public/brand/logoname.svg'

type ModalContextExtended = ReturnType<typeof useModalContext> & {
  toggleOpen: () => void
}

export default function MenuBar() {
  const [fullRadius] = useToken('radii', ['full'])
  const { isOpen, toggleOpen, onClose } = useModalContext() as ModalContextExtended
  const { back, threshold = 100 } = useLayoutContext()

  const [isAtTop, setIsAtTop] = useState(true)
  const [isScrollingBack, setIsScrollingBack] = useState(false)

  const whenFixed = !isAtTop && isScrollingBack
  const whenVisible = isAtTop || isScrollingBack

  const barMotion = useAnimationControls()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  useEffect(() => {
    const unSubScrollY = scrollY.on('change', (y) => {
      setIsAtTop(y <= 0)
    })

    const unSubVelocity = scrollVelocity.on('change', (v) => {
      if (v > 0) {
        setIsScrollingBack(false)
      }
      if (v < -threshold) {
        setIsScrollingBack(true)
      }
    })

    return () => {
      unSubVelocity()
      unSubScrollY()
    }
  }, [scrollY, scrollVelocity, threshold])

  useEffect(() => {
    barMotion.set(whenFixed && !isOpen ? 'fixed' : 'unfixed')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    barMotion.start({
      y: whenVisible ? 0 : '-100%',
      transition: { duration: 0.2, ease: 'easeInOut' },
    })
  }, [barMotion, whenFixed, whenVisible, isOpen])

  return (
    <MotionFlex
      pos="fixed"
      top={0}
      left={0}
      zIndex="menubar"
      alignItems="center"
      justifyContent="space-between"
      pointerEvents="none"
      w="full"
      minH={[14, 16]}
      py={3}
      px={[4, null, 8]}
      animate={barMotion}
      variants={menuBarBg}
    >
      <AnimatePresence mode="wait">
        {back && !isOpen ? (
          <SfxLink
            key={back}
            as={NextLink}
            href={back}
            textTransform="uppercase"
            fontWeight="medium"
            pointerEvents="auto"
            bg="whiteAlpha.700"
            p={1}
            rounded="card"
            roundedBottomRight="base"
            backdropFilter="blur(20px)"
            shadow="xl"
            _hover={{ textDecoration: 'none' }}
            _active={{
              transform: 'scale(0.98)',
            }}
            data-group
          >
            <Flex
              as="span"
              align="center"
              columnGap={1}
              px={3}
              py={1}
              _groupHover={{ bg: 'background' }}
              rounded="inherit"
            >
              <Box as="span" w={6} color="brand.300">
                <BackSquareBold color="currentColor" size="100%" />
              </Box>
              BACK
            </Flex>
          </SfxLink>
        ) : (
          <SfxLink
            key={ROUTES.home}
            as={NextLink}
            href={ROUTES.home}
            alignItems="center"
            gap={2}
            display="flex"
            pointerEvents="auto"
            _hover={{
              '& > span:first-of-type': {
                shadow: '0 0 0 5px rgba(255,255,255,0.15)',
                transform: 'scale(0.95) rotate(-45deg)',
              },
            }}
            aria-label={`${SITE_CONFIG.appName}: Home for Animal ABCs`}
            title={`${SITE_CONFIG.appName}: Home for Animal ABCs`}
            onClick={onClose}
          >
            <Box
              as="span"
              w={14}
              p={2}
              bg="background"
              borderWidth="5px"
              borderColor="currentcolor"
              rounded="circle"
              transitionDuration="0.2s"
              transitionProperty="transform,box-shadow"
            >
              <LogoSvg />
            </Box>
            <AnimatePresence>
              {isOpen && (
                <MotionSpan
                  display={['none', 'block']}
                  w={24}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
                  exit={{ x: 50, opacity: 0, transition: { duration: 0.3 } }}
                >
                  <LogonameSvg />
                </MotionSpan>
              )}
            </AnimatePresence>
          </SfxLink>
        )}
      </AnimatePresence>

      <MotionFlex
        layout
        alignItems="center"
        gap={2}
        p={1}
        pointerEvents="auto"
        bg="whiteAlpha.700"
        backdropFilter="blur(20px)"
        shadow="xl"
        initial={{ borderRadius: fullRadius }}
      >
        <Flex gap={2} display={isOpen ? 'none' : ['none', 'flex']}>
          <MusicButton />
          <SoundFxButton />
        </Flex>
        <MotionBox layout initial={{ borderRadius: fullRadius }}>
          <SfxButton
            display="flex"
            alignItems="center"
            gap={1}
            fontWeight="medium"
            textTransform="uppercase"
            _hover={{
              bg: 'background',
              shadow: '0 0 0 5px rgba(255,255,255,0.15)',
            }}
            _active={{
              bg: 'background',
              transform: 'scale(0.95)',
            }}
            px={0}
            variant="ghost"
            color="inherit"
            size="md"
            transition="transform 0.2s"
            onClick={toggleOpen}
            rounded="inherit"
          >
            <Box as="span" display={isOpen ? 'none' : 'inline'} ml={2}>
              Menu
            </Box>
            <MotionSpan layout w={10} h={10} p={2} bg="brand.300" rounded="circle">
              <MotionBurger open={isOpen} />
            </MotionSpan>
          </SfxButton>
        </MotionBox>
      </MotionFlex>
    </MotionFlex>
  )
}
