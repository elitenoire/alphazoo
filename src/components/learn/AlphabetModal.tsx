import NextImage from 'next/future/image'
import { AspectRatio, Modal, ModalBody, ModalContent, ModalFooter } from '@chakra-ui/react'
import type { AspectRatioProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { AddLinear, ArrowRightLinear, PlayBold } from 'react-iconsax-icons'
import { MotionBox, MotionFlex } from '~components/motion'
import { SfxIconButton } from '~components/sfx'

const MotionAspectRatio = motion<AspectRatioProps>(AspectRatio)

interface AlphabetModalProps {
  selected: string | null
  playSound: () => void
  onClose: () => void
}

export const AlphabetModal = ({ onClose, selected, playSound }: AlphabetModalProps) => {
  return (
    <Modal isOpen={!!selected} motionPreset="none" onClose={onClose} size="full">
      <ModalContent
        pos="relative"
        overflow="hidden"
        bg="transparent"
        containerProps={{ zIndex: 'zen' }}
      >
        <MotionBox
          pos="absolute"
          inset={0}
          bg="orange.200"
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
            <MotionAspectRatio
              layoutId={`learn-${selected}`}
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
                src={`./img/glyphs/${selected.toUpperCase()}.svg`}
                alt={`Animal letter ${selected}`}
                fill
                unoptimized
              />
            </MotionAspectRatio>
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
            <SfxIconButton
              shadow="sm"
              _hover={{
                bg: 'red.500',
                color: 'white',
              }}
              _active={{
                bg: 'red.600',
                color: 'white',
                transform: 'scale(0.98) rotate(45deg)',
              }}
              transform="rotate(45deg)"
              aria-label="Close"
              colorScheme="red"
              icon={<AddLinear color="currentColor" size="100%" />}
              onClick={onClose}
              size="lg"
              title="Close"
              variant="outline"
            />
            <SfxIconButton
              shadow="sm"
              _hover={{
                bg: 'blue.500',
                color: 'white',
              }}
              _active={{
                bg: 'blue.600',
                color: 'white',
                transform: 'scale(0.98)',
              }}
              aria-label="Play"
              colorScheme="blue"
              icon={<PlayBold color="currentColor" size="70%" />}
              size="lg"
              title="Play"
              variant="outline"
              onClick={playSound}
            />
            <SfxIconButton
              shadow="sm"
              _hover={{
                bg: 'brand.500',
                color: 'white',
              }}
              _active={{
                bg: 'brand.600',
                color: 'white',
                transform: 'scale(0.98)',
              }}
              aria-label="Continue"
              icon={<ArrowRightLinear color="currentColor" size="70%" />}
              size="lg"
              title="Continue"
              variant="outline"
            />
          </MotionFlex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
