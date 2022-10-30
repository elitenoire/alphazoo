import NextImage from 'next/future/image'
import { Heading, Box, List, ListItem, Text, Button } from '@chakra-ui/react'
import { MotionPop, MagneticBox } from '~components/motion'
import { HOMEPAGE_IDS } from '~src/constants'

import ImgDino from '~public/img/dino.svg'
import ImgAbc from '~public/img/abc.svg'
import ImgXylo from '~public/img/xylo.svg'
import ImgRobot from '~public/img/robot.svg'

export default function Features() {
  return (
    <Box as="section" px={[4, null, 8]} aria-labelledby={HOMEPAGE_IDS.features}>
      <Heading color="brand.900" fontSize="f5xl" id={HOMEPAGE_IDS.features}>
        Made for Fun
      </Heading>
      <Text fontSize={['f2xl', null, null, null, 'f3xl']}>
        We offer fun activities & games for kids to grow their knowledge and develop their cognitive
        skills.
      </Text>
      <Box pt={[16, null, 20]} pb={16} textAlign="center">
        <List flexWrap="wrap" rowGap={[16, null, 20]} display="flex">
          <ListItem flexGrow={1} flexShrink={1} flexBasis={['100%', null, '50%']}>
            <MotionPop>
              <Box maxW="15em" mx="auto" bg="blackAlpha.200" rounded="50%">
                <NextImage src={ImgAbc} alt="Colorful ABC toy blocks" />
              </Box>
              <Text mt={1} fontSize="fxl" fontWeight={500}>
                English Letters
              </Text>
            </MotionPop>
          </ListItem>
          <ListItem flexGrow={1} flexShrink={1} flexBasis={['100%', '50%']}>
            <MotionPop delay={0.1}>
              <Box maxW="15em" mx="auto" bg="blackAlpha.200" rounded="50%">
                <NextImage src={ImgXylo} alt="Colorful xylophone toy" />
              </Box>
              <Text mt={1} fontSize="fxl" fontWeight={500}>
                Phonics
              </Text>
            </MotionPop>
          </ListItem>
          <ListItem flexGrow={1} flexShrink={1} flexBasis={['100%', '50%']}>
            <MotionPop delay={0.15}>
              <Box maxW="15em" mx="auto" bg="blackAlpha.200" rounded="50%">
                <NextImage src={ImgDino} alt="Cute green dinosaur doodle" />
              </Box>
              <Text mt={1} fontSize="fxl" fontWeight={500}>
                Animal Wiki
              </Text>
            </MotionPop>
          </ListItem>
          <ListItem flexGrow={1} flexShrink={1} flexBasis={['100%', null, '50%']}>
            <MotionPop delay={0.2}>
              <Box maxW="15em" mx="auto" bg="blackAlpha.200" rounded="50%">
                <NextImage src={ImgRobot} alt="Colorful toy robot" />
              </Box>
              <Text mt={1} fontSize="fxl" fontWeight={500}>
                Puzzle
              </Text>
            </MotionPop>
          </ListItem>
        </List>
        <MotionPop display="inline-block" mt={20}>
          <MagneticBox>
            <Button
              color="text"
              bg="secondary.300"
              _hover={{ bg: 'secondary.400' }}
              _active={{ bg: 'secondary.500' }}
              colorScheme="secondary"
            >
              Explore App
            </Button>
          </MagneticBox>
        </MotionPop>
      </Box>
    </Box>
  )
}
