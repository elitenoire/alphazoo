import type { ComponentProps } from 'react'
import { chakra } from '@chakra-ui/react'

import { ReactComponent as UndySvg } from '~public/img/undy.svg'

const ChakraUndy = chakra(UndySvg)

interface UnderlineProps extends ComponentProps<typeof ChakraUndy> {
  fillTopDots?: string
  fillBottomDots?: string
}

export const Underline = ({ fillTopDots, fillBottomDots, ...rest }: UnderlineProps) => {
  return (
    <ChakraUndy
      role="separator"
      fill="brand.400"
      mb={[40, 60]}
      sx={{
        ...(fillTopDots && { '& .undy_svg__tdots': { fill: fillTopDots } }),
        ...(fillBottomDots && { '& .undy_svg__bdots': { fill: fillBottomDots } }),
      }}
      {...rest}
    />
  )
}
