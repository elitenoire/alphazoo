import type { IconButtonProps } from '@chakra-ui/react'
import { forwardRef } from '@chakra-ui/react'
import { SfxIconButton } from '~components/sfx'

export const GalleryButton = forwardRef<Omit<IconButtonProps, 'aria-label'>, 'button'>(
  ({ title, ...rest }, ref) => {
    return (
      <SfxIconButton
        ref={ref}
        position="absolute"
        bg="whiteAlpha.200"
        color="white"
        borderColor="whiteAlpha.200"
        _hover={{
          bg: 'whiteAlpha.300',
        }}
        _active={{
          bg: 'whiteAlpha.400',
          transform: 'scale(0.98)',
        }}
        aria-label={title}
        colorScheme="gray"
        size="lg"
        title={title}
        variant="outline"
        {...rest}
      />
    )
  }
)

GalleryButton.displayName = 'GalleryButton'
