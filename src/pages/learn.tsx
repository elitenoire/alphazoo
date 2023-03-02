import NextImage from 'next/future/image'
import { useState, useCallback } from 'react'
import {
  Flex,
  Box,
  Heading,
  List,
  ListItem,
  AspectRatio,
  SlideFade,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { MotionBox, MotionText, MotionSpan, MagneticBox, MotionFlex } from '~components/motion'
import { SfxButton, SfxLink } from '~components/sfx'
import { getLearnLayout } from '~components/layout/DefaultLayouts'

import { ReactComponent as LeftPandaSvg } from '~public/img/bg-panda-l.svg'
import { ReactComponent as RightPandaSvg } from '~public/img/bg-panda-r.svg'
import ImgTrunks from '~public/img/bg-trunks.svg'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

const container: Variants = {
  in: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.6,
      delayChildren: 1.2,
    },
  },
  out: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
}

const appear: Variants = {
  out: (factor: number) => ({
    opacity: 0,
    y: `${factor * 100}%`,
    scale: 0.75,
    transition: { type: 'spring', duration: 0.5 * factor },
  }),
  in: (factor: number) => ({
    opacity: 1,
    scale: 1,
    y: '0%',
    transition: { type: 'spring', duration: 0.5 * factor },
  }),
}

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

const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('')

interface AlphabetModalProps {
  selected: string | null
  onClose: () => void
}

const AlphabetModal = ({ onClose, selected }: AlphabetModalProps) => {
  return (
    <AnimatePresence>
      {selected && (
        <Modal isOpen={!!selected} motionPreset="none" onClose={onClose} size="full">
          <ModalContent pos="relative" overflow="hidden" bg="transparent">
            <MotionBox
              pos="absolute"
              inset={0}
              bg="red.500"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              // @ts-expect-error from chakra-ui official docs
              transition={{ duration: 0.4 }}
            />
            <ModalCloseButton zIndex={5} />
            <ModalBody
              pos="relative"
              zIndex={1}
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <MotionBox layoutId="">
                <AspectRatio w="80vmin" ratio={1}>
                  <NextImage
                    src={`./img/glyphs/${selected.toUpperCase()}.svg`}
                    alt={`Animal letter ${selected}`}
                    fill
                    unoptimized
                  />
                </AspectRatio>
              </MotionBox>
            </ModalBody>
            <ModalFooter pos="relative" zIndex={1}>
              <ModalCloseButton zIndex={5} />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default function Learn() {
  const [started, setStarted] = useState(false)
  const [gridReady, setGridReady] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const showGrid = started && gridReady

  const handleClick = useCallback(() => {
    setStarted(true)
  }, [])

  const handleExit = useCallback(() => {
    setGridReady(true)
  }, [])

  const handleClose = useCallback(() => {
    setSelected(null)
  }, [])

  const select = useCallback(
    (alpha: string) => () => {
      setSelected(alpha)
    },
    []
  )

  return (
    <Flex
      pos="relative"
      align="center"
      overflow="hidden"
      {...(gridReady ? { minH: 'full' } : { h: '100vh', minH: '31.25em' })}
    >
      <Box pos="absolute" w="full" inset={0}>
        <NextImage className="object-cover" fill src={ImgTrunks} alt="" unoptimized />
      </Box>
      <AnimatePresence onExitComplete={handleExit}>
        {!started && (
          <Box pos="absolute" w="full" inset={0}>
            <MotionBox
              pos="absolute"
              w={['50%', null, null, '45%']}
              left={0}
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              // @ts-expect-error from chakra-ui official docs
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <LeftPandaSvg />
            </MotionBox>
            <MotionBox
              pos="absolute"
              w={['40%', null, null, '30%']}
              right={2}
              bottom={0}
              initial={{ y: '100%' }}
              animate={{ y: '45%' }}
              exit={{ y: '100%' }}
              // @ts-expect-error from chakra-ui official docs
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <RightPandaSvg />
            </MotionBox>
            <MotionFlex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              minH="full"
              px={4}
              variants={container}
              initial="out"
              animate="in"
              exit="out"
            >
              <Flex
                align="flex-start"
                direction="column"
                gap={3}
                fontFamily="title"
                fontSize={['flg', 'fxl']}
              >
                <MotionSpan
                  px={3}
                  py={2}
                  color="orange.400"
                  bg="whiteAlpha.900"
                  boxShadow="xl"
                  borderRadius="full"
                  border="3px solid"
                  variants={appear}
                  custom={2.75}
                  willChange="opacity"
                >
                  <Box as="span" fontSize="2xl">
                    Hi!{' '}
                  </Box>
                </MotionSpan>
                <MotionSpan
                  px={3}
                  py={2}
                  color="orange.400"
                  bg="whiteAlpha.900"
                  boxShadow="xl"
                  borderRadius="3xl"
                  border="3px solid"
                  variants={appear}
                  custom={2}
                  willChange="opacity"
                >
                  Our friends are waiting to meet you.
                </MotionSpan>
              </Flex>
              <MotionText
                my={6}
                px={3}
                py={2}
                color="orange.400"
                bg="whiteAlpha.900"
                fontFamily="title"
                fontSize={['flg', 'fxl']}
                boxShadow="2xl"
                borderRadius="3xl"
                border="3px solid"
                variants={appear}
                custom={1}
                willChange="opacity"
              >
                Learn our names while having fun.
              </MotionText>
              <MotionBox variants={appear} custom={1}>
                <MagneticBox>
                  <SfxButton colorScheme="orange" onClick={handleClick}>
                    Start
                  </SfxButton>
                </MagneticBox>
              </MotionBox>
            </MotionFlex>
          </Box>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        <Box
          pos="relative"
          zIndex={1}
          w="full"
          pt={24}
          pb={16}
          px={{ base: 8, xl: '8%' }}
          visibility={showGrid ? 'visible' : 'hidden'}
        >
          <SlideFade in={showGrid} offsetY="100%">
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
                  borderRadius="full"
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
            animate={showGrid ? 'in' : 'out'}
          >
            {alphabets.map((alphabet) => (
              <MotionListItem key={alphabet} variants={item}>
                {/* Extra wrapper because of https://github.com/framer/motion/issues/1197 */}
                <MotionBox
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.1,
                    transition: { type: 'spring', stiffness: 200 },
                  }}
                >
                  <SfxLink
                    as="button"
                    type="button"
                    display="flex"
                    position="relative"
                    justifyContent="center"
                    bg="white"
                    h="full"
                    w="full"
                    borderRadius="md"
                    p="10%"
                    boxShadow="sm"
                    _hover={{ boxShadow: 'xl' }}
                    appearance="none"
                    onClick={select(alphabet)}
                  >
                    <AspectRatio as="span" display="block" w="100%" ratio={1}>
                      <NextImage
                        src={`./img/glyphs/${alphabet.toUpperCase()}.svg`}
                        alt={`Animal letter ${alphabet}`}
                        fill
                        unoptimized
                      />
                    </AspectRatio>
                  </SfxLink>
                </MotionBox>
              </MotionListItem>
            ))}
          </MotionList>
        </Box>
      </AnimatePresence>
      <AlphabetModal
        // isOpen={showGrid}
        selected={selected}
        onClose={handleClose}
      />
      {/* <AnimatePresence>
        {selected && (
        )}
      </AnimatePresence> */}
    </Flex>
  )
}

Learn.getLayout = getLearnLayout
