import NextLink from 'next/link'
import NextImage from 'next/image'
import { NextSeo } from 'next-seo'
import { Box, Flex, Container, Heading, Text } from '@chakra-ui/react'
import { Error404 as LottieError404 } from '~components/lottie/Error404'
import { SfxLink } from '~components/sfx'
import { ROUTES } from '~src/constants'

import ImgBg from '~public/img/bg-pattern-1.svg'

export default function Error404() {
  return (
    <>
      <NextSeo title="Page Not Found" noindex />
      <Flex
        pos="relative"
        align="center"
        justify="center"
        overflow="hidden"
        minH="$100vh"
        py={16}
        bgGradient="linear(bg.brand.warm, brand.dark)"
      >
        <Box pos="absolute" opacity={0.1} inset={0}>
          <NextImage className="object-cover" src={ImgBg} alt="" fill />
        </Box>
        <Container pos="relative" zIndex={1}>
          <Box w="80%" mx="auto">
            <LottieError404 />
          </Box>
          <Box pt={4} textAlign="center">
            <Heading as="h1" mb={1} color="text.highlight" fontSize="f2xl">
              Page Not Found
            </Heading>
            <Text color="brand.100" fontSize={[null, '2xl']}>
              There is nothing to see here
            </Text>
            <Text
              display="inline-block"
              mt={3}
              py={3}
              pr={2}
              pl={4}
              fontSize={[null, '2xl']}
              fontWeight="bold"
              textTransform="uppercase"
              bg="text.highlight"
              shadow="2xl"
              rounded="full"
            >
              Head back {''}
              <SfxLink
                as={NextLink}
                href={ROUTES.home}
                py={1}
                px={4}
                rounded="full"
                ml={2}
                bg="brand.600"
                color="brand.100"
                shadow="inner"
                _hover={{
                  color: 'brand.50',
                  bg: 'brand.800',
                }}
                _active={{
                  bg: 'brand.900',
                }}
              >
                🐼 Home 🚀
              </SfxLink>
            </Text>
          </Box>
        </Container>
      </Flex>
    </>
  )
}
