import { ComponentProps } from 'react'
import { chakra } from '@chakra-ui/react'

import { ReactComponent as UndySvg } from '~public/img/undy.svg'

const ChakraUndy = chakra(UndySvg)

export const Underline = (props: ComponentProps<typeof ChakraUndy>) => {
  return <ChakraUndy role="separator" fill="brand.400" mb={[40, 60]} {...props} />
}
