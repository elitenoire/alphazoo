import { Box, AspectRatio, Modal, ModalBody, ModalContent, ModalFooter } from '@chakra-ui/react'

export const GalleryModal = () => {
  return (
    <Modal isOpen motionPreset="none" onClose={() => ({})} size="full">
      <ModalContent
        pos="relative"
        overflow="hidden"
        bg="blackAlpha.700"
        backdropFilter="blur(5px)"
        containerProps={{ zIndex: 'zen' }}
      >
        <ModalBody
          pos="relative"
          zIndex={1}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Box bg="white" rounded="md" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
