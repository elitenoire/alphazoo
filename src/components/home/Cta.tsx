import NextLink from 'next/link'
import type { Variants } from 'framer-motion'
import { Heading, Box } from '@chakra-ui/react'
import { MotionSpan, MotionPop, MagneticBox } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { ROUTES } from '~src/constants'

const slide: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: (d: number) => ({
    opacity: 1,
    y: '0%',
    transition: { type: 'spring', duration: 1, delay: d || 0 },
  }),
}

export default function Cta() {
  return (
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
        <MotionSpan
          variants={slide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Learning.{' '}
        </MotionSpan>
        <MotionSpan
          custom={0.2}
          color="brand.500"
          variants={slide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          It&apos;s Free.
        </MotionSpan>
      </Heading>
      <MotionPop delay={0.2} display="inline-block" mt={8}>
        <MagneticBox>
          <SfxButton as={NextLink} href={ROUTES.learn} color="background">
            Start Learning
          </SfxButton>
        </MagneticBox>
      </MotionPop>
    </Box>
  )
}
