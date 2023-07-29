import type { PropsWithChildren, ComponentProps } from 'react'
import NextImage from 'next/image'
import { Box } from '@chakra-ui/react'

interface FixedBackgroundProps extends ComponentProps<typeof NextImage> {}

export const FixedBackground = ({
  className,
  src,
  alt = '',
  children,
  ...rest
}: PropsWithChildren<FixedBackgroundProps>) => {
  return (
    <Box w="full" clipPath="inset(0)">
      <Box pos="fixed" top={0} left={0} boxSize="full">
        <NextImage
          className={`object-cover ${className ?? ''}`}
          fill
          src={src}
          alt={alt}
          unoptimized
          {...rest}
        />
      </Box>
      <Box pos="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  )
}
