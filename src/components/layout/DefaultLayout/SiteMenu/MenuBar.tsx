import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useAnimationControls, useScroll, useVelocity, AnimatePresence } from 'framer-motion'
import { Box, Flex, useToken, useModalContext } from '@chakra-ui/react'
import { MotionFlex, MotionBox, MotionSpan, MotionBurger } from '~components/motion'
import { SfxLink, SfxButton } from '~components/sfx'
import { ROUTES, SITE_CONFIG } from '~src/constants'

import { MusicButton, SoundFxButton } from './MenuAudioButtons'
import { menuBarBg } from './variants'

import { ReactComponent as LogoSvg } from '~public/brand/logo.svg'
import { ReactComponent as LogonameSvg } from '~public/brand/logoname.svg'

type ModalContextExtended = ReturnType<typeof useModalContext> & {
  toggleOpen: () => void
}

const velocityThreshold = 100

export default function MenuBar() {
  const [fullRadius] = useToken('radii', ['full'])
  const { isOpen, toggleOpen, onClose } = useModalContext() as ModalContextExtended

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
      if (v < -velocityThreshold) {
        setIsScrollingBack(true)
      }
    })

    return () => {
      unSubVelocity()
      unSubScrollY()
    }
  }, [scrollY, scrollVelocity])

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
      w="100%"
      minH={[14, 16]}
      py={3}
      px={[4, null, 8]}
      animate={barMotion}
      variants={menuBarBg}
    >
      <SfxLink
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

      <MotionFlex
        layout
        alignItems="center"
        gap={2}
        p={1}
        pointerEvents="auto"
        bg={whenFixed ? 'background' : 'whiteAlpha.900'}
        shadow="xl"
        initial={{ borderRadius: fullRadius }}
      >
        <Flex gap={2} display={isOpen ? 'none' : ['none', 'flex']}>
          <MusicButton whenFixed={whenFixed} />
          <SoundFxButton whenFixed={whenFixed} />
        </Flex>
        <MotionBox layout initial={{ borderRadius: fullRadius }}>
          <SfxButton
            display="flex"
            alignItems="center"
            gap={1}
            fontWeight="medium"
            textTransform="uppercase"
            _hover={{ bg: whenFixed ? 'secondary.200' : 'brand.100' }}
            _active={{
              bg: whenFixed ? 'secondary.300' : 'brand.200',
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
