import NextImage from 'next/image'
import type { PropsWithChildren } from 'react'
import type { Variants } from 'framer-motion'
import type { ListProps, ListItemProps, AspectRatioProps } from '@chakra-ui/react'
import type { PlayFunction } from 'use-sound/dist/types'
import { useState, useCallback, useRef, useImperativeHandle, forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Heading, List, ListItem, AspectRatio, Fade } from '@chakra-ui/react'
import { MotionBox } from '~components/motion'
import { SfxLink } from '~components/sfx'
import { usePhonics } from '~src/hooks/usePhonics'

import { AlphabetModal } from '~components/learn/AlphabetModal'

// import type { AlphabetType } from '~/types/data'
import { alphabets } from '~src/data/alphabets'
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

export function AlphabetGrid({ show }: AlphabetGridProps) {
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
          layerStyle="page"
          pos="relative"
          zIndex={1}
          w="full"
          pt={[32, 24]}
          visibility={show ? 'visible' : 'hidden'}
        >
          <Fade transition={{ enter: { duration: 0.6 } }} in={show}>
            <Heading color="background" textAlign="center">
              Learn the{' '}
              <Box
                as="span"
                display={['block', 'inline']}
                p={[null, 1]}
                color="brand.300"
                fontSize="3xl"
              >
                26
              </Box>{' '}
              Alphabets
            </Heading>
          </Fade>
          <MotionList
            layerStyle="gridy"
            pt={16}
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
                        boxSize="full"
                        rounded="10%"
                        p="10%"
                        boxShadow="sm"
                        layerStyle="pushy"
                        _hover={{ boxShadow: 'xl' }}
                        appearance="none"
                        onClick={select(alphabet)}
                      >
                        <MotionAspectRatio
                          layoutId={`learn-${name}`}
                          as="span"
                          display="block"
                          w="full"
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
