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
    <section aria-labelledby={HOMEPAGE_IDS.features}>
      <Heading color="brand.500" fontSize="f5xl" id={HOMEPAGE_IDS.features}>
        Made for Fun
      </Heading>
      <Text fontSize={['f2xl', null, null, null, 'f3xl']}>
        We offer fun activities & games for kids to grow their knowledge and develop their cognitive
        skills.
      </Text>
      <Box py={16} textAlign="center">
        <List flexWrap="wrap" rowGap={12} display="flex">
          <ListItem flex="1 1 50%">
            <MotionPop>
              <Box maxW="15em" mx="auto">
                <NextImage src={ImgAbc} alt="Colorful ABC toy blocks" />
              </Box>
              <Text fontSize="fxl">English Letters</Text>
            </MotionPop>
          </ListItem>
          <ListItem flex="1 1 50%">
            <MotionPop delay={0.1}>
              <Box maxW="15em" mx="auto">
                <NextImage src={ImgXylo} alt="Colorful xylophone toy" />
              </Box>
              <Text fontSize="fxl">Phonics</Text>
            </MotionPop>
          </ListItem>
          <ListItem flex="1 1 50%">
            <MotionPop delay={0.15}>
              <Box maxW="15em" mx="auto">
                <NextImage src={ImgDino} alt="Cute green dinosaur doodle" />
              </Box>
              <Text fontSize="fxl">Animal Wiki</Text>
            </MotionPop>
          </ListItem>
          <ListItem flex="1 1 50%">
            <MotionPop delay={0.2}>
              <Box maxW="15em" mx="auto">
                <NextImage src={ImgRobot} alt="Colorful toy robot" />
              </Box>
              <Text fontSize="fxl">Puzzle</Text>
            </MotionPop>
          </ListItem>
        </List>
        <MotionPop display="inline-block" mt={12}>
          <MagneticBox>
            <Button>Explore App</Button>
          </MagneticBox>
        </MotionPop>
      </Box>
    </section>
  )
}
