import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Heading: ComponentSingleStyleConfig = {
  //   baseStyle: {},
  variants: {
    caps: {
      textTransform: 'uppercase',
    },
  },
  defaultProps: {
    variant: 'caps',
  },
}
