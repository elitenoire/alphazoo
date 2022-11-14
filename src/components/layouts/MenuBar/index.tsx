import { useState, useCallback, useEffect } from 'react'
import NextLink from 'next/link'
import type { Variants } from 'framer-motion'
import { useAnimationControls, useScroll, useVelocity, AnimatePresence } from 'framer-motion'
import { Box, Flex, Link, useToken } from '@chakra-ui/react'
import { MotionFlex, MotionBox, MotionSpan, MotionBurger } from '~components/motion'
import { SITE_CONFIG } from '~src/constants'

import { MusicButton } from './MusicButton'
import { SoundsButton } from './SoundsButton'

import { ReactComponent as LogoSvg } from '~public/brand/logo.svg'
import { ReactComponent as LogonameSvg } from '~public/brand/logoname.svg'

const barBg: Variants = {
  unfixed: {
    backgroundImage: 'none',
    backgroundSize: 0,
    backdropFilter: 'none',
  },
  fixed: {
    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0) 1px, rgba(0,0,0,0.08) 1px)',
    backgroundSize: '0.2em 0.2em',
    backdropFilter: 'blur(3px)',
  },
}

export default function MenuBar() {
  const velocityThreshold = 100

  const [fullRadius] = useToken('radii', ['full'])

  const [isAtTop, setIsAtTop] = useState(true)
  const [isScrollingBack, setIsScrollingBack] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const whenFixed = !isAtTop && isScrollingBack
  const whenVisible = isAtTop || isScrollingBack

  const barMotion = useAnimationControls()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  const toggleOpen = useCallback(() => {
    setIsOpen((_open) => !_open)
  }, [])

  useEffect(() => {
    const unSubScrollY = scrollY.onChange((y) => {
      setIsAtTop(y <= 0)
    })

    const unSubVelocity = scrollVelocity.onChange((v) => {
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
  }, [scrollY, scrollVelocity, barMotion])

  useEffect(() => {
    barMotion.set(whenFixed ? 'fixed' : 'unfixed')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    barMotion.start({
      y: whenVisible ? 0 : '-100%',
      transition: { duration: 0.2, ease: 'easeInOut' },
    })
  }, [barMotion, whenFixed, whenVisible])

  return (
    <MotionFlex
      pos="fixed"
      top={0}
      left={0}
      zIndex="max"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      minH={[14, 16]}
      py={3}
      px={[4, null, 8]}
      animate={barMotion}
      variants={barBg}
    >
      <NextLink href="/" passHref>
        <Link
          alignItems="center"
          gap={2}
          display="flex"
          _hover={{
            '& > span:first-of-type': {
              shadow: '0 0 0 5px rgba(255,255,255,0.15)',
              transform: 'scale(0.95) rotate(-45deg)',
            },
          }}
          aria-label={`${SITE_CONFIG.appName}: Home for Animal ABCs`}
          title={`${SITE_CONFIG.appName}: Home for Animal ABCs`}
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
            <LogoSvg fill="currentcolor" />
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
                <LogonameSvg fill="currentcolor" />
              </MotionSpan>
            )}
          </AnimatePresence>
        </Link>
      </NextLink>

      <MotionFlex
        layout
        alignItems="center"
        gap={2}
        p={1}
        bg={whenFixed ? 'background' : 'whiteAlpha.900'}
        shadow="xl"
        initial={{ borderRadius: fullRadius }}
      >
        <Flex gap={2} display={isOpen ? 'none' : ['none', 'flex']}>
          <MusicButton whenFixed={whenFixed} />
          <SoundsButton whenFixed={whenFixed} />
        </Flex>
        <MotionBox layout initial={{ borderRadius: fullRadius }}>
          <Flex
            as="button"
            align="center"
            gap={1}
            fontWeight="medium"
            textTransform="uppercase"
            _hover={{ bg: whenFixed ? 'secondary.200' : 'brand.100' }}
            _active={{
              bg: whenFixed ? 'secondary.300' : 'brand.200',
              transform: 'scale(0.95)',
            }}
            appearance="none"
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
          </Flex>
        </MotionBox>
      </MotionFlex>
    </MotionFlex>
  )
}
