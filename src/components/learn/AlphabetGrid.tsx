import NextImage from 'next/image'
import type { PropsWithChildren } from 'react'
import type { Variants } from 'framer-motion'
import type { ListProps, ListItemProps, AspectRatioProps } from '@chakra-ui/react'
import type { PlayFunction } from 'use-sound/dist/types'
import { useState, useCallback, useRef, useImperativeHandle, forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Heading, List, ListItem, AspectRatio, SlideFade } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'
import { SfxLink } from '~components/sfx'
import { usePhonics } from '~/src/hooks/usePhonics'

import { AlphabetModal } from '~components/learn/AlphabetModal'

// import type { AlphabetType } from '~/types/data'
import { alphabets } from '~/src/data/alphabets'
type AlphabetType = (typeof alphabets)[number]
type GlyphType = AlphabetType['name']

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)
const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

interface SoundRef {
  play: PlayFunction
}

interface SoundRegisterProps {
  glyph: GlyphType
}

const SoundRegister = forwardRef<SoundRef, PropsWithChildren<SoundRegisterProps>>(
  ({ children, glyph }, ref) => {
    const [play] = usePhonics(`/sounds/alphabets/${glyph.toLowerCase()}.mp3`)

    useImperativeHandle(
      ref,
      () => ({
        play,
      }),
      [play]
    )

    return <>{children}</>
  }
)
SoundRegister.displayName = 'SoundRegister'

const list: Variants = {
  in: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  out: {},
}

const item: Variants = {
  in: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35 },
  },
  out: {
    opacity: 0,
    scale: 0.4,
    transition: { duration: 0.3 },
  },
}

type AlphabetSounds = Record<GlyphType, SoundRef>
interface AlphabetGridProps {
  show: boolean
}

export default function AlphabetGrid({ show }: AlphabetGridProps) {
  const [selected, setSelected] = useState<AlphabetType | null>(null)

  const alphabetSoundsRef = useRef<Partial<AlphabetSounds>>({})

  const getRef = useCallback(
    (alphabet: GlyphType) => (elm: SoundRef) => {
      alphabetSoundsRef.current[alphabet] = elm
    },
    []
  )

  const handlePlay = useCallback(() => {
    if (selected) {
      alphabetSoundsRef.current[selected.name]?.play()
    }
  }, [selected])

  const handleClose = useCallback(() => {
    setSelected(null)
  }, [])

  const select = useCallback(
    (alphabet: AlphabetType) => () => {
      setSelected(alphabet)
    },
    []
  )

  return (
    <>
      <AnimatePresence initial={false}>
        <Box
          pos="relative"
          zIndex={1}
          w="full"
          pt={24}
          pb={16}
          px={{ base: 8, xl: '8%' }}
          visibility={show ? 'visible' : 'hidden'}
        >
          <SlideFade transition={{ enter: { duration: 0.4 } }} in={show} offsetY="100%">
            <Heading textAlign="center">
              Learn the{' '}
              <Box as="span" display={['block', 'inline']} my={[1, 0]}>
                <Box
                  as="span"
                  p={1}
                  color="orange.400"
                  fontSize="xl"
                  lineHeight="none"
                  bg="whiteAlpha.800"
                  rounded="full"
                >
                  26
                </Box>
              </Box>{' '}
              Alphabets
            </Heading>
          </SlideFade>
          <MotionList
            display="grid"
            sx={{
              '--gap': { base: '1.5em', xl: '1.375em' },
              '--size': '6.25em',
              '--max-column': '8',
            }}
            placeContent="center"
            pt={8}
            gap="var(--gap)"
            gridTemplateColumns="repeat(auto-fit, minmax(min(max(100% / var(--max-column) - var(--gap), var(--size)), 100%),1fr))"
            variants={list}
            initial="out"
            animate={show ? 'in' : 'out'}
          >
            {alphabets.map((alphabet) => {
              const { name } = alphabet
              return (
                <MotionListItem key={name} variants={item}>
                  {/* Extra wrapper because of https://github.com/framer/motion/issues/1197 */}
                  <MotionBox
                    whileTap={{ scale: 0.95 }}
                    whileHover={{
                      scale: 1.1,
                      transition: { type: 'spring', stiffness: 200 },
                    }}
                  >
                    <SoundRegister ref={getRef(name)} glyph={name}>
                      <SfxLink
                        as="button"
                        type="button"
                        display="flex"
                        position="relative"
                        justifyContent="center"
                        bg="white"
                        h="full"
                        w="full"
                        rounded="md"
                        p="10%"
                        boxShadow="sm"
                        _hover={{ boxShadow: 'xl' }}
                        appearance="none"
                        onClick={select(alphabet)}
                      >
                        <MotionAspectRatio
                          layoutId={`learn-${name}`}
                          as="span"
                          display="block"
                          w="100%"
                          ratio={1}
                        >
                          <NextImage
                            src={`/img/glyphs/${name.toUpperCase()}.svg`}
                            alt={`Animal letter ${name}`}
                            fill
                            unoptimized
                          />
                        </MotionAspectRatio>
                      </SfxLink>
                    </SoundRegister>
                  </MotionBox>
                </MotionListItem>
              )
            })}
          </MotionList>
        </Box>
      </AnimatePresence>
      <AlphabetModal selected={selected} onClose={handleClose} playSound={handlePlay} />
    </>
  )
}
