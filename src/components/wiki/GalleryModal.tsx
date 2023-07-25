import type { ModalCloseButtonProps, ModalProps } from '@chakra-ui/react'
import { Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton } from '@chakra-ui/react'
import { withSfx } from '~components/sfx'

const SfxModalCloseButton = withSfx<ModalCloseButtonProps, 'button'>(ModalCloseButton)

interface GalleryModalProps extends ModalProps {
  offsetCloseBtn?: boolean
}

export const GalleryModal = ({
  size = 'full',
  motionPreset = 'slideInBottom',
  offsetCloseBtn,
  children,
  ...rest
}: GalleryModalProps) => {
  return (
    <Modal motionPreset={motionPreset} size={size} {...rest}>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent pos="relative" overflow="hidden" bg="transparent">
        <SfxModalCloseButton
          zIndex={1}
          top={[1, null, offsetCloseBtn ? 10 : 4]}
          right={[1, null, offsetCloseBtn ? 10 : 12]}
          p={[6, null, 8]}
          rounded={['md', null, 'circle']}
        />
        <ModalBody flex={1} display="flex" px={0} py={0}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
