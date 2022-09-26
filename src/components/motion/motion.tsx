// https://chakra-ui.com/guides/integrations/with-framer

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

export const MotionHeading = chakra(motion.h2, config)

export const MotionText = chakra(motion.p, config)
