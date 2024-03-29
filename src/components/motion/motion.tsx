// https://chakra-ui.com/getting-started/with-framer
import type { ComponentProps } from 'react'
import { chakra, shouldForwardProp, ChakraStyledOptions } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'

const config: ChakraStyledOptions = {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
}

export const MotionBox = chakra(motion.div, config)

export const MotionFlex = chakra(motion.div, {
  ...config,
  baseStyle: {
    display: 'flex',
  },
})

export const MotionSpan = chakra(motion.span, config)

export const MotionHeading = chakra(motion.h2, config)

export const MotionText = chakra(motion.p, config)

export type MotionBoxProps = ComponentProps<typeof MotionBox>
export type MotionFlexProps = ComponentProps<typeof MotionFlex>
export type MotionSpanProps = ComponentProps<typeof MotionSpan>
export type MotionHeadingProps = ComponentProps<typeof MotionHeading>
export type MotionTextProps = ComponentProps<typeof MotionText>

/**
 * Quirks in chakra-ui + framer-motion integration
 *
 */

// ***** Does not support the ref prop

// type MotionBoxProps = Merge<BoxProps, MotionProps>
// type MotionBoxProps = Merge<BoxProps, MotionProps> & { ref?: React.Ref<any> }

// ****** For both, color prop type matches framer motion
// ****** instead of chakra-ui

// type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>
// type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<'div'>>

// export const MotionBox: React.FC<MotionBoxProps> = motion(Box)
