import type { IconButtonProps } from '@chakra-ui/react'
import { forwardRef } from '@chakra-ui/react'
import { ArrowLeft1Linear, ArrowRight1Linear } from 'react-iconsax-icons'
import { SfxIconButton } from '~components/sfx'

type NavButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  prev?: boolean
  center?: boolean
}

export const NavButton = forwardRef<NavButtonProps, 'button'>(
  ({ title, center, prev, ...rest }, ref) => {
    const Icon = prev ? ArrowLeft1Linear : ArrowRight1Linear
    return (
      <SfxIconButton
        ref={ref}
        position={center ? 'fixed' : 'absolute'}
        bg="whiteAlpha.400"
        color="black"
        borderColor="blackAlpha.800"
        _hover={{
          bg: 'whiteAlpha.500',
        }}
        _active={{
          bg: 'whiteAlpha.600',
          transform: 'scale(0.98)',
        }}
        aria-label={title}
        colorScheme="gray"
        size="lg"
        title={title}
        variant="outline"
        backdropFilter="blur(8px)"
        boxShadow="2xl"
        icon={<Icon color="currentColor" size="35%" />}
        {...(prev && { left: 1 })}
        {...(!prev && { right: 1 })}
        {...(center && { top: 'calc(50% - 1.5em)', zIndex: 'max' })}
        {...rest}
      />
    )
  }
)

NavButton.displayName = 'NavButton'
