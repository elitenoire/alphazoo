import NextLink from 'next/link'
import NextImage from 'next/image'
import type { AspectRatioProps } from '@chakra-ui/react'
import {
  Box,
  AspectRatio,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { AddLinear, VolumeLow1Bold, Book1Bold } from 'react-iconsax-icons'
import { MotionBox, MotionFlex } from '~components/motion'
import { SfxIconButton } from '~components/sfx'
import { ROUTES } from '~src/constants'

import { settings, Animations } from './variants'

import type { AlphabetType } from '~/types/data'

const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

interface AlphabetModalProps {
  selected: AlphabetType | null
  playSound: () => void
  onClose: () => void
}

export const AlphabetModal = ({ onClose, selected, playSound }: AlphabetModalProps) => {
  const modalBg = selected?.modalBg ?? 'orange.200'
  const idx = (selected?.numeral ?? 1) % settings.length

  return (
    <Modal autoFocus={false} isOpen={!!selected} motionPreset="none" onClose={onClose} size="full">
      <ModalContent pos="relative" overflow="hidden" bg="transparent">
        <MotionBox
          pos="absolute"
          inset={0}
          bg={modalBg}
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-100%' }}
          // @ts-expect-error from chakra-ui official docs
          transition={{ duration: 0.4 }}
        />
        <ModalBody
          pos="relative"
          zIndex={1}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          {selected && (
            <Box pos="relative">
              <MotionAspectRatio
                layoutId={`learn-${selected.name}`}
                w={{ base: '80vmin', lg: '70vmin' }}
                ratio={1}
                // https://github.com/framer/motion/issues/1524
                // temp fix for shared layout portal issue (enter animation)
                initial={{ scale: 0.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                // @ts-expect-error from chakra-ui official docs
                transition={{ duration: 0.6 }}
                onAnimationComplete={playSound}
              >
                <NextImage
                  src={`/img/glyphs/${selected.name.toUpperCase()}.svg`}
                  alt={`Animal letter ${selected.name}`}
                  fill
                  unoptimized
                />
              </MotionAspectRatio>
              <MotionBox
                bg={modalBg}
                sx={{
                  img: {
                    mixBlendMode: 'soft-light',
                    objectFit: 'contain',
                    objectPosition: 'bottom',
                  },
                }}
                pos="absolute"
                w="35%"
                h="35%"
                zIndex={-1}
                initial="out"
                animate={['in', settings[idx].left.animate]}
                exit="out"
                variants={Animations}
                {...settings[idx].left.props}
              >
                <NextImage fill src={`/img/${settings[idx].left.img}`} alt="" unoptimized />
              </MotionBox>
              <MotionBox
                bg={modalBg}
                sx={{
                  img: { mixBlendMode: 'overlay', objectFit: 'contain', objectPosition: 'top' },
                }}
                pos="absolute"
                w="35%"
                h="35%"
                zIndex={-1}
                initial="out"
                animate={['in', settings[idx].right.animate]}
                exit="out"
                variants={Animations}
                {...settings[idx].right.props}
              >
                <NextImage fill src={`/img/${settings[idx].right.img}`} alt="" unoptimized />
              </MotionBox>
            </Box>
          )}
        </ModalBody>
        <ModalFooter pos="relative" zIndex={1} justifyContent="center">
          <MotionFlex
            gap={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // @ts-expect-error from chakra-ui official docs
            transition={{ duration: 0.4 }}
          >
            <Tooltip hasArrow label="Close">
              <SfxIconButton
                shadow="sm"
                bg="red.500"
                color="white"
                _hover={{
                  bg: 'red.400',
                  transform: 'rotate(225deg)',
                  shadow: '0 0 0 5px rgba(255,255,255,0.25)',
                }}
                _active={{
                  bg: 'red.500',
                  color: 'white',
                  transform: 'scale(0.98) rotate(225deg)',
                }}
                transform="rotate(45deg)"
                aria-label="Close"
                colorScheme="red"
                icon={<AddLinear color="currentColor" size="75%" />}
                size="lg"
                onClick={onClose}
              />
            </Tooltip>
            <Tooltip hasArrow label="Play">
              <SfxIconButton
                shadow="sm"
                bg="white"
                color={selected?.color ?? 'inherit'}
                layerStyle="pushy"
                _hover={{
                  color: 'white',
                  bg: selected?.color ?? 'black',
                  shadow: '0 0 0 5px rgba(255,255,255,0.25)',
                }}
                aria-label="Play"
                icon={<VolumeLow1Bold color="currentColor" size="70%" />}
                size="lg"
                onClick={playSound}
              />
            </Tooltip>
            <Tooltip hasArrow label="Learn">
              <SfxIconButton
                as={NextLink}
                href={`${ROUTES.learn}/${selected?.name.toLowerCase() ?? ''}`}
                shadow="sm"
                bg="white"
                color={selected?.color ?? 'inherit'}
                layerStyle="pushy"
                _hover={{
                  color: 'white',
                  bg: selected?.color ?? 'black',
                  shadow: '0 0 0 5px rgba(255,255,255,0.25)',
                }}
                aria-label="Learn"
                icon={<Book1Bold color="currentColor" size="65%" />}
                size="lg"
              />
            </Tooltip>
          </MotionFlex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
