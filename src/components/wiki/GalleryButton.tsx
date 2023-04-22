import type { IconButtonProps } from '@chakra-ui/react'
import { forwardRef } from '@chakra-ui/react'
import { SfxIconButton } from '~components/sfx'

type GalleryButtonProps = Omit<IconButtonProps, 'aria-label'>

export const GalleryButton = forwardRef<GalleryButtonProps, 'button'>(({ title, ...rest }, ref) => {
  return (
    <SfxIconButton
      ref={ref}
      position="absolute"
      bg="whiteAlpha.400"
      color="white"
      borderColor="whiteAlpha.600"
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
      {...rest}
    />
  )
})

GalleryButton.displayName = 'GalleryButton'
