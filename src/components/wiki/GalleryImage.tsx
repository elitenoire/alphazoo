import NextImage from 'next/image'
import { Box, Flex, AspectRatio, Text } from '@chakra-ui/react'

interface GalleryImageProps {
  rounded?: boolean
}

export const GalleryImage = ({ rounded }: GalleryImageProps) => {
  return (
    <Box
      pos="relative"
      flex={1}
      w="full"
      minH={400}
      bg="gray.200"
      {...(rounded && { rounded: { md: 'card' } })}
    >
      <Box pos="absolute" overflow="hidden" w="full" minH="full" inset={0} rounded="inherit">
        <NextImage
          className="object-cover"
          fill
          src="/img/wiki/alligator-bg.svg"
          alt=""
          unoptimized
        />
      </Box>

      <Text
        pos="absolute"
        bottom={0}
        m={1}
        p={4}
        fontFamily="heading"
        fontSize="fxl"
        fontWeight="bold"
        textTransform="capitalize"
        bg="whiteAlpha.700"
        rounded={rounded ? ['tiny', null, '1em'] : 'tiny'}
      >
        Ally The{' '}
        <Box as="span" color="brand.800">
          Alligator
        </Box>
      </Text>
    </Box>
  )
}
