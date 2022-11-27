import { useState, useCallback } from 'react'
import { Box, Flex, Link, useModalContext } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'
import { SITE_CONFIG } from '~src/constants'
import { MenuLinks } from './MenuLinks'
import { MenuAudioPanel } from './MenuAudioPanel'
import { MenuFaces } from './MenuFaces'
import { menuOverlay } from './variants'

import { ReactComponent as GithubSvg } from '~public/icons/github.svg'
import { ReactComponent as BuyCoffeeSvg } from '~public/icons/buymeacoffee.svg'

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
        <Box pos="relative" zIndex={1} flex={1} overflow="hidden" pt={[20, null, null, 14]} px={8}>
          <Flex
            align="center"
            direction={['column', null, null, 'row-reverse']}
            rowGap={8}
            columnGap={10}
          >
            <Box as="nav" flex={{ lg: 1 }}>
              <MenuLinks onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} />
            </Box>
            <Box w={['100%', null, null, '37.5%']} maxW={[null, 'sm', null, 'none']}>
              <MenuAudioPanel />
            </Box>
          </Flex>
        </Box>
        <MenuFaces hovered={hovered} />
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
