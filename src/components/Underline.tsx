import type { ComponentProps } from 'react'
import { chakra } from '@chakra-ui/react'

import { ReactComponent as UndySvg } from '~public/img/undy.svg'

const ChakraUndy = chakra(UndySvg)

type ChakraUndyProps = ComponentProps<typeof ChakraUndy>

type UnderlineProps = ChakraUndyProps & {
  fillTopDots?: string
  fillBottomDots?: string
}

export const Underline = ({
  fill = 'brand.400',
  fillTopDots,
  fillBottomDots,
  ...rest
}: UnderlineProps) => {
  return (
    <ChakraUndy
      role="separator"
      fill={fill}
      mb={[40, 60]}
      sx={{
        ...(fillTopDots && { '& .undy_svg__tdots': { fill: fillTopDots } }),
        ...(fillBottomDots && { '& .undy_svg__bdots': { fill: fillBottomDots } }),
      }}
      {...rest}
    />
  )
}
