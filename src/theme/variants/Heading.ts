import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Heading: ComponentSingleStyleConfig = {
  //   baseStyle: {},
  variants: {
    caps: {
      textTransform: 'uppercase',
    },
    title: {
      fontFamily: 'title',
      textTransform: 'uppercase',
      lineHeight: 'none',
      fontVariant: 'discretionary-ligatures',
    },
    body: {
      fontFamily: 'body',
    },
    glyph: {
      fontFamily: 'glyph',
    },
  },
  defaultProps: {
    variant: 'caps',
  },
}
