import NextImage from 'next/image'
import NextLink from 'next/link'
import { Box, Flex, AspectRatio, Heading, Text } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { ROUTES } from '~/src/constants'

import type { AlphabetType } from '~/types/data'

interface DiscoveryProps {
  alphabet?: AlphabetType
}

export default function Discovery({ alphabet }: DiscoveryProps) {
  return (
    <Flex direction={['column', null, null, 'row']} rowGap={16} pt={16} roundedBottom="inherit">
      <Box
        w={['full', null, null, '60%']}
        pt="8vw"
        pr={[4, 16]}
        pb={12}
        pl={[4, 8]}
        bg={alphabet ? `${alphabet.bg}.200` : 'blackAlpha.100'}
        roundedBottom="inherit"
        roundedTopRight="15vw"
      >
        <Heading
          as="h2"
          mb={1}
          fontSize="f4xl"
          variant="body"
          {...(alphabet && { color: `${alphabet.bg}.700` })}
        >
          Make a Discovery
        </Heading>
        <Text maxW="2xs" fontSize="fxl">
          Learn about animals that begin with <strong>{alphabet?.name ?? ''}</strong> and other
          alphabets
        </Text>
        <SfxButton
          as={NextLink}
          href={ROUTES.wiki}
          variant="ghost"
          colorScheme={alphabet?.bg ?? 'blackAlpha'}
          bg="whiteAlpha.900"
          my={6}
        >
          Discover
        </SfxButton>
        <Flex wrap="wrap" rowGap={4}>
          <MotionPop once flexGrow={1} flexShrink={1} flexBasis={['50%', null, 'auto', '50%']}>
            <AspectRatio w={['75%', null, '95%', '70%']} ratio={1}>
              <NextImage src={`/img/potrait-1.svg`} alt={`cute animal portrait`} fill unoptimized />
            </AspectRatio>
          </MotionPop>
          <MotionPop
            once
            flexGrow={1}
            flexShrink={1}
            flexBasis={['50%', null, 'auto', '50%']}
            delay={0.1}
          >
            <AspectRatio w={['75%', null, '95%', '70%']} ratio={1}>
              <NextImage src={`/img/potrait-2.svg`} alt={`cute animal portrait`} fill unoptimized />
            </AspectRatio>
          </MotionPop>
          <MotionPop
            once
            flexGrow={1}
            flexShrink={1}
            flexBasis={['50%', null, 'auto', '50%']}
            delay={0.125}
          >
            <AspectRatio w={['75%', null, '95%', '70%']} ratio={1}>
              <NextImage src={`/img/potrait-3.svg`} alt={`cute animal portrait`} fill unoptimized />
            </AspectRatio>
          </MotionPop>
          <MotionPop
            once
            flexGrow={1}
            flexShrink={1}
            flexBasis={['50%', null, 'auto', '50%']}
            delay={0.15}
          >
            <AspectRatio w={['75%', null, '95%', '70%']} ratio={1}>
              <NextImage src={`/img/potrait-4.svg`} alt={`cute animal portrait`} fill unoptimized />
            </AspectRatio>
          </MotionPop>
        </Flex>
      </Box>
    </Flex>
  )
}
