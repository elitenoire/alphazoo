import { Box, Flex } from '@chakra-ui/react'
import { MotionPop, MotionBox } from '~components/motion'
import { AnimalHead } from '~components/AnimalHead'

export const BannerHeads = () => {
  return (
    <Flex px="5%" transform="auto" data-group translateX={['-15%', '-5%', 0]}>
      <MotionBox
        flex={1}
        initial={{ x: '80%', scale: 0.7 }}
        animate={{
          x: '80%',
          scale: 0.7,
          rotate: [0, -15, 15, 0, -5, -15, -30, -45],
          transition: { duration: 1, delay: 0.25 + 0.65 + 2.25 },
        }}
      >
        <MotionPop delay={0.25 + 0.65} once>
          <AnimalHead animal="tiger" icon />
        </MotionPop>
      </MotionBox>
      <Box
        flex={1}
        _groupHover={{
          translateY: '-10%',
          scale: '0.98',
        }}
        transform="auto"
        transition="transform 0.3s"
        scale={0.9}
        translateX="35%"
      >
        <MotionPop delay={0.25 + 0.35} once>
          <AnimalHead animal="frog" icon />
        </MotionPop>
      </Box>
      <Box zIndex={2} flex={1}>
        <MotionPop delay={0.25} once>
          <AnimalHead animal="rabbit" icon />
        </MotionPop>
      </Box>
      <Box
        zIndex={1}
        flex={1}
        display={['none', 'block']}
        _groupHover={{
          translateY: '-10%',
          scale: 0.98,
        }}
        transform="auto"
        transition="transform 0.3s ease 0.15s"
        scale={0.9}
        translateX="-35%"
      >
        <MotionPop delay={0.25 + 0.5} once>
          <AnimalHead animal="squirrel" icon />
        </MotionPop>
      </Box>
      <Box flex={1} display={['none', null, 'block']} transform="translateX(-80%) scale(0.7)">
        <MotionPop delay={0.25 + 0.8} once>
          <AnimalHead animal="lion" icon />
        </MotionPop>
      </Box>
    </Flex>
  )
}
