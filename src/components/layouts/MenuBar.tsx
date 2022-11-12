import { useRef, useEffect } from 'react'
import NextLink from 'next/link'
import { useAnimationControls, useScroll, useVelocity, Variants } from 'framer-motion'
import { Flex, Link, IconButton } from '@chakra-ui/react'
import { MotionFlex } from '~components/motion'
import { SITE_CONFIG } from '~src/constants'
import { VolumeHighBold, MusicBold } from 'react-iconsax-icons'

import { ReactComponent as LogoSvg } from '~public/brand/logo.svg'

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

  const isAtTopRef = useRef(true)
  const isScrollingBackRef = useRef(false)
  const barMotion = useAnimationControls()

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  useEffect(() => {
    const unSubScrollY = scrollY.onChange((y) => {
      isAtTopRef.current = y <= 0
    })

    const unSubVelocity = scrollVelocity.onChange((v) => {
      if (v > 0) {
        isScrollingBackRef.current = false
      }
      if (v < -velocityThreshold) {
        isScrollingBackRef.current = true
      }
      const isScrollingBack = isScrollingBackRef.current
      const isAtTop = isAtTopRef.current

      barMotion.set(!isAtTop && isScrollingBack ? 'fixed' : 'unfixed')
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      barMotion.start({
        y: isAtTop || isScrollingBack ? 0 : '-100%',
        transition: { duration: 0.2, ease: 'easeInOut' },
      })
    })

    return () => {
      unSubVelocity()
      unSubScrollY()
    }
  }, [scrollY, scrollVelocity, barMotion])

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
          w={14}
          p={2}
          bg="background"
          borderWidth="5px"
          borderColor="currentcolor"
          _hover={{
            shadow: '0 0 0 5px rgba(255,255,255,0.15)',
            transform: 'scale(0.95) rotate(-45deg)',
          }}
          aria-label={`${SITE_CONFIG.appName} Home`}
          rounded="50%"
          title={`${SITE_CONFIG.appName} Home`}
          transitionDuration="0.25s"
          transitionProperty="transform,box-shadow"
        >
          <LogoSvg fill="currentcolor" />
        </Link>
      </NextLink>
      <Flex align="center" gap={2} p={1} bg="whiteAlpha.900" shadow="xl" rounded="full">
        <IconButton
          display={['none', 'inline-flex']}
          color="inherit"
          _hover={{
            shadow: '0 0 0 5px rgba(255,255,255,0.15)',
            bgColor: 'brand.100',
          }}
          aria-label="Music On"
          bgColor="transparent"
          icon={<MusicBold color="currentColor" size="65%" />}
          size="md"
          title="Music On"
          transitionDuration="0.2s"
          transitionProperty="transform,box-shadow"
        />
        <IconButton
          display={['none', 'inline-flex']}
          color="inherit"
          _hover={{
            shadow: '0 0 0 5px rgba(255,255,255,0.15)',
            bgColor: 'brand.100',
          }}
          aria-label="Sound On"
          bgColor="transparent"
          icon={<VolumeHighBold color="currentColor" size="65%" />}
          size="md"
          title="Sound On"
          transitionDuration="0.2s"
          transitionProperty="transform,box-shadow"
        />
      </Flex>
    </MotionFlex>
  )
}
