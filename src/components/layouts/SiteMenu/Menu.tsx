import { Link, useModalContext } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'
import { SITE_CONFIG } from '~src/constants'

import { ReactComponent as GithubSvg } from '~public/icons/github.svg'
import { ReactComponent as BuyCoffeeSvg } from '~public/icons/buymeacoffee.svg'

export const Menu = () => {
  const { isOpen } = useModalContext()

  return isOpen ? (
    <MotionBox pos="fixed" zIndex="menuoverlay" inset={0} overflowY="scroll" bg="brand.300">
      <Link
        pos="absolute"
        bottom={0}
        left={0}
        w={10}
        h={10}
        p={2}
        bg="background"
        aria-label="Support Me"
        href={SITE_CONFIG.supportLink}
        isExternal
        roundedTop="circle"
        title="Support Me"
      >
        <BuyCoffeeSvg fill="currentColor" />
      </Link>
      <Link
        pos="absolute"
        right={0}
        bottom={0}
        w={10}
        h={10}
        p={2}
        bg="background"
        aria-label="Github Page"
        href={SITE_CONFIG.githubLink}
        isExternal
        roundedTop="circle"
        title="Github Page"
      >
        <GithubSvg fill="currentColor" />
      </Link>
    </MotionBox>
  ) : null
}
