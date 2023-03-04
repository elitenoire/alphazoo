import NextImage from 'next/future/image'
import type { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'
import { MotionFlex } from '~components/motion'

import ImgTrunks from '~public/img/bg-trunks.svg'

interface BackgroundProps {
  expand: boolean
}

export default function Background({ expand, children }: PropsWithChildren<BackgroundProps>) {
  return (
    <MotionFlex
      layout
      pos="relative"
      alignItems="center"
      overflow="hidden"
      // @ts-expect-error from chakra-ui official docs
      transition={{ duration: 0.3 }}
      {...(expand ? { minH: 'full' } : { h: '100vh', minH: '31.25em' })}
    >
      <Box pos="absolute" w="full" inset={0}>
        <NextImage className="object-cover" fill src={ImgTrunks} alt="" unoptimized />
      </Box>
      {children}
    </MotionFlex>
  )
}
