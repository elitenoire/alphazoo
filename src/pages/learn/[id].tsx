import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useCallback } from 'react'
import { Box, Flex, VisuallyHidden, Heading, useToken } from '@chakra-ui/react'
import { ArrowLeft1Linear, ArrowRight1Linear } from 'react-iconsax-icons'
import { MotionPop } from '~components/motion'
import { SfxIconButton } from '~components/sfx'
// import { AlphabetDiscovery } from '~components/learn/AlphabetDiscovery'
import { AlphabetAnimation } from '~components/learn/AlphabetAnimation'
import { useGestureNavigation } from '~src/hooks/useGestureNavigation'
import { ROUTES } from '~src/constants'

import { getLayout } from '~components/layout/AlphabetLayout'

import { alphabets } from '~src/data/alphabets'

export default function LearnAlphabet({
  alphabet,
  prevId,
  nextId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const shadowColor = useToken('colors', 'brand.300', 'white')

  const { push } = useRouter()

  const prev = useCallback(() => {
    if (prevId) {
      void push(`${ROUTES.learn}/${prevId.toLowerCase()}`)
    }
  }, [prevId, push])

  const next = useCallback(() => {
    if (nextId) {
      void push(`${ROUTES.learn}/${nextId.toLowerCase()}`)
    }
  }, [nextId, push])

  const handlers = useGestureNavigation({
    prev,
    next,
    allowPrefetch: !!prevId || !!nextId,
    ...(prevId && { prevUrl: `${ROUTES.learn}/${prevId.toLowerCase()}` }),
    ...(nextId && { nextUrl: `${ROUTES.learn}/${nextId.toLowerCase()}` }),
  })

  const bgTheme = alphabet ? `${alphabet.bg}.100` : 'white'

  return (
    <Box bg={bgTheme} shadow={`0 0 0 1.5em ${shadowColor}`} roundedBottom="10vw">
      <VisuallyHidden as="h1">{`Alphabet ${alphabet?.name ?? ''}`}</VisuallyHidden>
      <AlphabetAnimation alphabet={alphabet} {...handlers}>
        <MotionPop marge="0px">
          <Box textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
            <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
              <NextImage
                className="object-contain"
                src={`/img/animals/ant.svg`}
                alt={`Ant`}
                fill
                unoptimized
                priority
              />
            </Box>
            <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }}>
              Ant
            </Heading>
          </Box>
        </MotionPop>
        <MotionPop marge="0px">
          <Box textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
            <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
              <NextImage
                className="object-contain"
                src={`/img/animals/alligator.svg`}
                alt={`Alligator`}
                fill
                unoptimized
                priority
              />
            </Box>
            <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }}>
              Alligator
            </Heading>
          </Box>
        </MotionPop>
        <MotionPop marge="0px">
          <Box textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
            <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
              <NextImage
                className="object-contain"
                src={`/img/animals/antelope.svg`}
                alt={`Antelope`}
                fill
                unoptimized
                priority
              />
            </Box>
            <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }}>
              Antelope
            </Heading>
          </Box>
        </MotionPop>
      </AlphabetAnimation>
      <Flex
        pos="fixed"
        zIndex="backtotop"
        bottom={4}
        left={0}
        justify="center"
        w="full"
        pointerEvents="none"
      >
        <Flex
          columnGap={5}
          p={1}
          bg="blackAlpha.700"
          border="2px solid"
          pointerEvents="auto"
          backdropFilter="blur(10px)"
          rounded="full"
        >
          <SfxIconButton
            colorScheme="gray"
            bg={bgTheme}
            _hover={{ bg: 'white' }}
            _active={{ transform: 'scale(0.98)' }}
            icon={<ArrowLeft1Linear color="currentColor" size="35%" />}
            aria-label={`previous alphabet ${prevId.toUpperCase()}`}
            title={`previous alphabet ${prevId.toUpperCase()}`}
            onClick={prev}
            isDisabled={!prevId}
          />
          <SfxIconButton
            colorScheme="gray"
            bg={bgTheme}
            _hover={{ bg: 'white' }}
            _active={{ transform: 'scale(0.98)' }}
            icon={<ArrowRight1Linear color="currentColor" size="35%" />}
            aria-label={`next alphabet ${nextId.toUpperCase()}`}
            title={`next alphabet ${nextId.toUpperCase()}`}
            onClick={next}
            isDisabled={!nextId}
          />
        </Flex>
      </Flex>
      {/* <AlphabetDiscovery alphabet={alphabet} /> */}
    </Box>
  )
}

LearnAlphabet.getLayout = (page: ReactElement) =>
  getLayout(page, { back: ROUTES.learn, bg: 'brand.400' })

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = alphabets.map((alphabet) => ({
    params: {
      id: alphabet.name.toLowerCase(),
    },
  }))

  return { paths, fallback: false }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
  let prevId = ''
  let nextId = ''

  const alphabet = alphabets.find((_alphabet, i, self) => {
    const match = _alphabet.name.toLowerCase() === params?.id
    if (match) {
      self.forEach((a) => {
        if (a.numeral === _alphabet.numeral - 1) {
          prevId = a.name
        }
        if (a.numeral === _alphabet.numeral + 1) {
          nextId = a.name
        }
      })
    }
    return match
  })

  return { props: { alphabet, prevId, nextId } }
}
