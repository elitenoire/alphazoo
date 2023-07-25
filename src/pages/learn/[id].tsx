import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useCallback } from 'react'
import { Box, Flex, VisuallyHidden, Tooltip, useToken } from '@chakra-ui/react'
import { ArrowLeft1Linear, ArrowRight1Linear } from 'react-iconsax-icons'
import { SfxIconButton } from '~components/sfx'
// import { AlphabetDiscovery } from '~components/learn/AlphabetDiscovery'
import { AlphabetEnterAnimation } from '~components/learn/AlphabetEnterAnimation'
import { AlphabetAnimals } from '~components/learn/AlphabetAnimals'
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
  const prevLabel = `Alphabet ${prevId.toUpperCase()}`
  const nextLabel = `Alphabet ${nextId.toUpperCase()}`

  return (
    <Box bg={bgTheme} shadow={`0 0 0 1.5em ${shadowColor}`} roundedBottom="10vw">
      <VisuallyHidden as="h1">{`Alphabet ${alphabet?.name ?? ''}`}</VisuallyHidden>
      <AlphabetEnterAnimation alphabet={alphabet} {...handlers}>
        <AlphabetAnimals bg={bgTheme} />
      </AlphabetEnterAnimation>
      <Flex
        pos="fixed"
        zIndex="docked"
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
          <Tooltip hasArrow isDisabled={!prevId} label={prevLabel}>
            <SfxIconButton
              layerStyle="pushy"
              bg={bgTheme}
              _hover={{ bg: 'white' }}
              aria-label={prevLabel}
              colorScheme="gray"
              icon={<ArrowLeft1Linear color="currentColor" size="35%" />}
              isDisabled={!prevId}
              onClick={prev}
            />
          </Tooltip>
          <Tooltip hasArrow isDisabled={!nextId} label={nextLabel}>
            <SfxIconButton
              layerStyle="pushy"
              bg={bgTheme}
              _hover={{ bg: 'white' }}
              aria-label={nextLabel}
              colorScheme="gray"
              icon={<ArrowRight1Linear color="currentColor" size="35%" />}
              isDisabled={!nextId}
              onClick={next}
            />
          </Tooltip>
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
