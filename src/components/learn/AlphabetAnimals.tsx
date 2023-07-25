import NextImage from 'next/image'

import { useState, useCallback } from 'react'
import { Box, Flex, Center, Heading, Tooltip } from '@chakra-ui/react'
import { PetBold } from 'react-iconsax-icons'
import { MotionPop } from '~components/motion'
import { SfxIconButton } from '~components/sfx'
import { GalleryModal } from '~components/wiki/GalleryModal'
import { GalleryImage } from '~components/wiki/GalleryImage'

import { wikis } from '~src/data/wiki'

interface AlphabetAnimalsProps {
  //   alphabet?: AlphabetType
  bg?: string
}

export const AlphabetAnimals = ({ bg }: AlphabetAnimalsProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
    console.log('OPENING MODAL*******')
  }, [])

  return (
    <>
      <Flex direction="column" gap={{ base: 28, '2xl': '4vw' }} w="full" px={[4, '5%', '10%']}>
        <MotionPop marge="0px">
          <Box pos="relative" textAlign="center" bg="white" rounded={{ base: '5em', xl: '5vw' }}>
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
            <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }} variant="title">
              Ant
            </Heading>
            <Center
              pos="absolute"
              top={0}
              right={0}
              boxSize={14}
              m={4}
              //   bg={bgTheme}
              bg="blackAlpha.100"
              shadow="inner"
              onClick={handleOpen}
              rounded="circle"
            >
              <Box as="span" fontSize="lg" fontWeight={700}>
                i
              </Box>
            </Center>
          </Box>
        </MotionPop>
        <MotionPop marge="0px">
          <Box
            layerStyle="interactive"
            pos="relative"
            textAlign="center"
            bg="white"
            onClick={() => {
              console.log('CARD CLICKED******!')
            }}
            rounded={{ base: '5em', xl: '5vw' }}
          >
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
            <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }} variant="title">
              Alligator
            </Heading>
            <Tooltip hasArrow label="Open wiki">
              <SfxIconButton
                pos="absolute"
                top={3}
                right={3}
                isRound
                shadow="inner"
                fontSize="lg"
                aria-label="Open wiki"
                bg="blackAlpha.100"
                color="inherit"
                layerStyle="pushy"
                _hover={{ bg, shadow: 'none' }}
                icon={<PetBold color="currentColor" size="40%" />}
                onClick={handleOpen}
              />
            </Tooltip>
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
            <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }} variant="title">
              Antelope
            </Heading>
          </Box>
        </MotionPop>
      </Flex>
      <GalleryModal
        isOpen={open}
        motionPreset="slideInBottom"
        onClose={handleClose}
        size="full"
        offsetCloseBtn
      >
        <Flex flex={1} w="full" p={[null, null, 4]}>
          <GalleryImage wiki={wikis[1]} rounded open />
        </Flex>
      </GalleryModal>
    </>
  )
}
