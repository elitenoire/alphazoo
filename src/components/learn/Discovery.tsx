import NextLink from 'next/link'
import { Box, Flex, Heading, Text, Link, chakra } from '@chakra-ui/react'
import { AnimalPortrait } from '~components/learn/AnimalPortrait'
import { MotionPop, MotionBox, MagneticBox } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { ROUTES } from '~src/constants'
import { Animations } from './variants'

import { ReactComponent as BgOneSvg } from '~public/img/ogbg-1.svg'
import { ReactComponent as BgTwoSvg } from '~public/img/ogbg-2.svg'

import { ReactComponent as ShapeOneSvg } from '~public/img/ogshape-1.svg'
import { ReactComponent as ShapeTwoSvg } from '~public/img/ogshape-2.svg'
import { ReactComponent as ShapeThreeSvg } from '~public/img/ogshape-3.svg'
import { ReactComponent as ShapeFourSvg } from '~public/img/ogshape-4.svg'

const ChakraBgOneSvg = chakra(BgOneSvg)
const ChakraBgTwoSvg = chakra(BgTwoSvg)

import type { AlphabetType } from '~/types/data'

interface DiscoveryProps {
  alphabet?: AlphabetType
}

export default function Discovery({ alphabet }: DiscoveryProps) {
  return (
    <Flex
      direction={['column', null, null, 'row']}
      overflow="hidden"
      pt={16}
      roundedBottom="inherit"
    >
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
          <AnimalPortrait src="/img/portrait-1.svg" />
          <AnimalPortrait src="/img/portrait-2.svg" delay={0.1} />
          <AnimalPortrait src="/img/portrait-3.svg" delay={0.125} />
          <AnimalPortrait src="/img/portrait-4.svg" delay={0.15} />
        </Flex>
      </Box>
      <Flex
        pos="relative"
        align="center"
        justify="center"
        flexGrow={1}
        flexShrink={1}
        flexBasis={['30vmax', null, null, 'auto']}
        py="10%"
        {...(alphabet && { color: `${alphabet.bg}.700` })}
      >
        <MotionPop
          pos="absolute"
          w={['20%', '15%', null, '30%']}
          left={['-5%', null, null, '-20%']}
          top="10%"
        >
          <ShapeOneSvg />
        </MotionPop>
        <MotionPop pos="absolute" w={['15%', '10%', null, '20%']} left={0} bottom="-5%">
          <ShapeTwoSvg />
        </MotionPop>
        <MotionPop pos="absolute" w={['20%', '15%', null, '20%']} right="-5%" top="20%">
          <ShapeThreeSvg />
        </MotionPop>
        <MotionPop
          pos="absolute"
          w="20%"
          right={['15%', null, null, '2%']}
          bottom={['-20%', null, null, '15%']}
        >
          <ShapeFourSvg />
        </MotionPop>

        <Flex
          zIndex={1}
          align="center"
          justify="center"
          wrap="wrap"
          direction={{ lg: 'column' }}
          flex={1}
          gap={6}
          h="full"
          px={[null, '12.5%', null, '17.5%']}
        >
          <MotionBox
            flexGrow={[null, 1, null, 0]}
            flexShrink={1}
            flexBasis={[52, 40]}
            w="full"
            whileInView="shake"
            custom={1}
            variants={Animations}
          >
            <ChakraBgOneSvg fill={alphabet ? `${alphabet.bg}.400` : 'white'} opacity={0.7} />
          </MotionBox>
          <Box flexGrow={[null, 1, null, 0]} flexShrink={1} flexBasis={[52, 40]} w="full">
            <MagneticBox pos="relative" role="group">
              <ChakraBgTwoSvg
                fill={alphabet ? `${alphabet.bg}.700` : 'white'}
                opacity={0.7}
                _groupHover={{ opacity: 1 }}
              />
              <MagneticBox.Parallax pos="absolute" inset={0}>
                <Link
                  as={NextLink}
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  w="full"
                  h="full"
                  color="white"
                  fontSize="fxl"
                  fontWeight="medium"
                  href={`${ROUTES.wiki}/ant`}
                >
                  Ant
                </Link>
              </MagneticBox.Parallax>
            </MagneticBox>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
