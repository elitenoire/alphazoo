import NextLink from 'next/link'
import NextImage from 'next/image'
import { NextSeo } from 'next-seo'
import { Box, Flex, Container, Heading, Text } from '@chakra-ui/react'
import { SfxLink } from '~components/sfx'
import { ROUTES } from '~src/constants'

import Img404 from '~public/img/404.svg'

export default function Error404() {
  return (
    <>
      <NextSeo title="Page Not Found" noindex />
      <Flex align="center" justify="center" overflow="hidden" minH="100vh" bg="brand.700">
        <Container>
          <Box maxW="xs" mx="auto">
            <NextImage src={Img404} alt="" unoptimized className="w-full" />
          </Box>
          <Box pt={4} textAlign="center">
            <Heading as="h1" mb={1} color="text.highlight" fontSize="f2xl">
              Page Not Found
            </Heading>
            <Text fontSize={[null, '2xl']}>There is nothing to see here</Text>
            <Text fontSize={[null, '2xl']}>
              Head back {''}
              <SfxLink
                as={NextLink}
                href={ROUTES.home}
                textStyle="highlight"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Home
              </SfxLink>
            </Text>
          </Box>
        </Container>
      </Flex>
    </>
  )
}
