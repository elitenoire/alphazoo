import { Heading, Box, List, ListItem, Text, Button, chakra } from '@chakra-ui/react'
import { MotionPop, MagneticBox } from '~components/motion'

import { ReactComponent as DinoSvg } from '~public/img/dino.svg'
import { ReactComponent as AbcSvg } from '~public/img/abc.svg'
import { ReactComponent as XyloSvg } from '~public/img/xylo.svg'
import { ReactComponent as RobotSvg } from '~public/img/robot.svg'

const ChakraAbc = chakra(AbcSvg)
const ChakraXylo = chakra(XyloSvg)
const ChakraDino = chakra(DinoSvg)
const ChakraRobot = chakra(RobotSvg)

export default function Features() {
  return (
    <section>
      <Heading color="brand.500" fontSize="f5xl">
        Made for Fun
      </Heading>
      <Text fontSize="f3xl">
        We offer fun activities & games for kids to grow their knowledge and develop their cognitive
        skills.
      </Text>
      <Box pt={16} textAlign="center">
        <List flexWrap="wrap" rowGap={12} display="flex">
          <ListItem flex="1 1 50%">
            <MotionPop>
              <ChakraAbc maxW="15em" mx="auto" />
              <Text fontSize="fxl">English Letters</Text>
            </MotionPop>
          </ListItem>
          <ListItem flex="1 1 50%">
            <MotionPop delay={0.1}>
              <ChakraXylo maxW="15em" mx="auto" />
              <Text fontSize="fxl">Phonics</Text>
            </MotionPop>
          </ListItem>
          <ListItem flex="1 1 50%">
            <MotionPop delay={0.15}>
              <ChakraDino maxW="15em" mx="auto" />
              <Text fontSize="fxl">Animal Wiki</Text>
            </MotionPop>
          </ListItem>
          <ListItem flex="1 1 50%">
            <MotionPop delay={0.2}>
              <ChakraRobot maxW="15em" mx="auto" />
              <Text fontSize="fxl">Puzzle</Text>
            </MotionPop>
          </ListItem>
        </List>
        <MotionPop display="inline-block" mt={12}>
          <MagneticBox p={4}>
            <Button>Explore the App</Button>
          </MagneticBox>
        </MotionPop>
      </Box>
    </section>
  )
}
