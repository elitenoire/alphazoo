import NextImage from 'next/image'
import { Box, AspectRatio } from '@chakra-ui/react'

export const GalleryIcon = ({ icon }: { icon: number }) => {
  return (
    <AspectRatio
      as="span"
      display="block"
      bg="white"
      _hover={{ transform: 'scale(1.05)' }}
      appearance="none"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      ratio={1}
      rounded="icon"
      transitionDuration="0.2s"
      transitionProperty="transform"
      transitionTimingFunction="ease-in-out"
    >
      <Box>{icon}</Box>
    </AspectRatio>
  )
}
