import { Heading, Box, Button } from '@chakra-ui/react'
import { MotionSpan, MotionPop, MagneticBox } from '~components/motion'
import { Underline } from '~components/Underline'

const slide = {
  hidden: { opacity: 0, y: '100%' },
  visible: (d = 0) => ({
    opacity: 1,
    y: '0%',
    transition: { type: 'spring', duration: 1, delay: d },
  }),
}

export default function Cta() {
  return (
    <>
      <Underline mt={36} />
      <Box as="section" pos="sticky" top={16} pb={36} textAlign="center">
        <Heading
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          columnGap={1}
          display="flex"
          px={1}
          fontSize={['f4xl', null, 'f5xl']}
          wordBreak="break-word"
          variant="body"
        >
          <MotionSpan variants={slide} initial="hidden" whileInView="visible">
            Learning.{' '}
          </MotionSpan>
          <MotionSpan
            custom={0.2}
            color="brand.500"
            variants={slide}
            initial="hidden"
            whileInView="visible"
          >
            It&apos;s Free.
          </MotionSpan>
        </Heading>
        <MotionPop delay={0.2} display="inline-block" mt={8}>
          <MagneticBox>
            <Button>Start Now</Button>
          </MagneticBox>
        </MotionPop>
      </Box>
    </>
  )
}
