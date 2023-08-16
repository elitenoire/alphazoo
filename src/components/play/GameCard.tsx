import type { ImageProps } from 'next/image'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Heading, AspectRatio, LinkBox } from '@chakra-ui/react'
import { SfxLinkOverlay } from '~components/sfx'
import type { ChakraColorScheme } from '~/types/theme'

interface GameCardProps {
  title?: string
  imgSrc?: ImageProps['src']
  href?: string
  colorScheme?: ChakraColorScheme
}

export const GameCard = ({ title = '', colorScheme = 'green', imgSrc, href }: GameCardProps) => {
  return (
    <LinkBox
      flexDir="column"
      display="flex"
      w="full"
      px={1}
      pb={1}
      bg={`${colorScheme}.400`}
      rounded="card"
      {...(href && {
        layerStyle: 'interactive',
        role: 'group',
      })}
    >
      {title || href ? (
        <Heading
          as="h3"
          zIndex={1}
          p={2}
          color={`${colorScheme}.50`}
          textTransform="capitalize"
          noOfLines={2}
        >
          {href ? (
            <SfxLinkOverlay as={NextLink} href={href}>
              {title}
            </SfxLinkOverlay>
          ) : (
            title
          )}
        </Heading>
      ) : (
        <Box as="span" p={5} />
      )}
      <Box
        flex={1}
        overflow="hidden"
        py={12}
        bg={`${colorScheme}.300`}
        roundedBottom="inherit"
        roundedTop="bigCard"
        {...(href && {
          _groupHover: {
            bg: `${colorScheme}.500`,
            boxShadow: 'inner',
          },
        })}
      >
        <AspectRatio
          w="50%"
          mx="auto"
          transform="auto"
          ratio={1}
          rotate={-45}
          scale={2}
          translateY="15%"
        >
          {imgSrc ? <NextImage src={imgSrc} alt="" fill /> : <span />}
        </AspectRatio>
      </Box>
    </LinkBox>
  )
}
