import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Heading: ComponentSingleStyleConfig = {
  //   baseStyle: {},
  variants: {
    caps: {
      textTransform: 'uppercase',
      lineHeight: 'none',
      fontVariant: 'discretionary-ligatures',
    },
    body: {
      fontFamily: 'body',
    },
    title: {
      fontFamily: 'title',
    },
  },
  defaultProps: {
    variant: 'caps',
  },
}
