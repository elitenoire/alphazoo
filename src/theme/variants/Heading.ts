import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Heading: ComponentSingleStyleConfig = {
  //   baseStyle: {},
  variants: {
    caps: {
      textTransform: 'uppercase',
      fontVariant: 'discretionary-ligatures',
    },
    body: {
      fontFamily: 'body',
    },
  },
  defaultProps: {
    variant: 'caps',
  },
}
