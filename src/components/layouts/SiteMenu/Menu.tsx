import { useState, useCallback } from 'react'
import NextLink from 'next/link'
import { Variants } from 'framer-motion'
import { Box, Flex, List, ListItem, Link, useModalContext } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'
import { SITE_CONFIG } from '~src/constants'
import { MenuAudioPanel } from './MenuAudioPanel'
import { MenuFaces } from './MenuFaces'

import { ReactComponent as GithubSvg } from '~public/icons/github.svg'
import { ReactComponent as BuyCoffeeSvg } from '~public/icons/buymeacoffee.svg'

const menuOverlay: Variants = {
  in: {
    visibility: 'visible',
    pointerEvents: 'auto',
    clipPath: 'ellipse(150% 110% at 50% 0)',
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
  },
  out: {
    clipPath: 'ellipse(50% 0% at 50% 0)',
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.25 },
    transitionEnd: {
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  },
}

export default function Menu() {
  const { isOpen, getDialogProps } = useModalContext()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const dialogProps = getDialogProps() as any

  const [hovered, setHovered] = useState(0)

  const onHoverStart = useCallback(
    (id: number) => () => {
      setHovered(id)
    },
    []
  )
  const onHoverEnd = useCallback(() => {
    setHovered(0)
  }, [])

  return (
    <MotionBox
      pos="fixed"
      zIndex="menuoverlay"
      inset={0}
      overflowY="auto"
      bg="brand.300"
      initial="out"
      animate={isOpen ? 'in' : 'out'}
      variants={menuOverlay}
      {...dialogProps}
    >
      <Flex direction="column" rowGap={4} minH="100%">
        <Box pos="relative" zIndex={1} flex={1} overflow="hidden" pt={20} px={8}>
          <Flex
            align="center"
            direction={['column', null, null, 'row-reverse']}
            rowGap={8}
            columnGap={10}
          >
            <Box as="nav" flex={{ lg: 1 }}>
              <List
                sx={{
                  counterReset: 'sitemenu',
                  ':hover a': {
                    opacity: 0.4,
                  },
                  li: {
                    position: 'relative',
                    counterIncrement: 'sitemenu',
                  },
                  a: {
                    display: 'inline-block',
                    borderBottom: '3px solid currentColor',
                    fontWeight: 'bold',
                    fontSize: 'f2xl',
                    pt: 1,
                    transformOrigin: 'left bottom',
                    ':before': {
                      content: 'counters(sitemenu, "", decimal-leading-zero)',
                      mr: 8,
                      fontSize: '0.35em',
                      opacity: 0.5,
                    },
                    ':hover': {
                      textDecoration: 'none',
                      opacity: '1 !important',
                      color: 'brand.900',
                      transform: 'scale(1.125)',
                    },
                  },
                }}
              >
                <ListItem>
                  <NextLink href="/" passHref>
                    <Link onMouseEnter={onHoverStart(1)} onMouseLeave={onHoverEnd}>
                      Home
                    </Link>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink href="/" passHref>
                    <Link onMouseEnter={onHoverStart(2)} onMouseLeave={onHoverEnd}>
                      Learn
                    </Link>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink href="/" passHref>
                    <Link onMouseEnter={onHoverStart(3)} onMouseLeave={onHoverEnd}>
                      Play
                    </Link>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink href="/" passHref>
                    <Link onMouseEnter={onHoverStart(4)} onMouseLeave={onHoverEnd}>
                      Wiki
                    </Link>
                  </NextLink>
                </ListItem>
                <ListItem>
                  <NextLink href="/" passHref>
                    <Link onMouseEnter={onHoverStart(5)} onMouseLeave={onHoverEnd}>
                      Profile
                    </Link>
                  </NextLink>
                </ListItem>
              </List>
            </Box>
            <Box w={['100%', null, null, '37.5%']} maxW={[null, 'sm', null, 'none']}>
              <MenuAudioPanel animate={isOpen} />
            </Box>
          </Flex>
        </Box>
        <MenuFaces hovered={hovered} animate={isOpen} />
      </Flex>
      <Link
        pos="fixed"
        bottom={0}
        left={0}
        w={10}
        h={10}
        p={2}
        bg="background"
        _hover={{ transform: 'scale(1.5)' }}
        aria-label="Support Me"
        href={SITE_CONFIG.supportLink}
        isExternal
        roundedTop="circle"
        title="Support Me"
        transitionDuration="normal"
      >
        <BuyCoffeeSvg fill="currentColor" />
      </Link>
      <Link
        pos="fixed"
        right={0}
        bottom={0}
        w={10}
        h={10}
        p={2}
        bg="background"
        _hover={{ transform: 'scale(1.5)' }}
        aria-label="Github Page"
        href={SITE_CONFIG.githubLink}
        isExternal
        roundedTop="circle"
        title="Github Page"
        transitionDuration="normal"
      >
        <GithubSvg fill="currentColor" />
      </Link>
    </MotionBox>
  )
}
