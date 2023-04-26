import { extendTheme, theme as baseTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { components } from './variants'
import { fonts, fontSizes } from './typography'

type TChakraSpace = Record<string | number, string>
type TChakraSize = Record<string | number, string | TChakraSpace>
type TChakraToken<T> = Record<string | number, string | T[keyof T]>

const remToEm = (value: string) => value.replace('rem', 'em')

const tokenTransform = <T extends object>(token: T) =>
  Object.keys(token).reduce<TChakraToken<T>>((acc, key) => {
    const value = token[key as keyof T]
    acc[key] = typeof value === 'string' ? remToEm(value) : value
    return acc
  }, {})

const space = tokenTransform<TChakraSpace>(baseTheme.space)
const sizes = tokenTransform<TChakraSize>(baseTheme.sizes)

const breakpoints = {
  sm: '32em', // 512px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
}

const radii = {
  xtiny: '2.5px',
  tiny: '5px',
  icon: '22%',
  circle: '50%',
  card: '2em',
  bigCard: '4em',
}

const zIndices = {
  max: 9990,
  backtotop: 9995,
  supermax: 9997,
  menuoverlay: 9998,
  menubar: 9999,
  zen: 10000,
}

const theme = extendTheme(
  {
    styles: {
      global: {
        '*': {
          WebkitTapHighlightColor: 'transparent',
        },
        body: {
          fontSize: 'fmd',
          lineHeight: 'shorter',
          bg: 'background',
        },
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'brand.300',
          borderRadius: '10px',
          border: '1.5px solid transparent',
          backgroundClip: 'content-box',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'brand.500',
          backgroundClip: 'content-box',
        },
        '::-webkit-scrollbar-track': {
          background: 'black',
        },
        '::selection': {
          bg: 'brand.300',
        },
        '::-moz-selection': {
          bg: 'brand.300',
        },
        '.w-full': {
          width: '100%',
        },
        '.object-cover': {
          objectFit: 'cover',
        },
        '.object-contain': {
          objectFit: 'contain',
        },
        '.object-bottom': {
          objectPosition: 'bottom',
        },
        '.object-bottom-l': {
          objectPosition: 'bottom left',
        },
        '.object-bottom-r': {
          objectPosition: 'bottom right',
        },
      },
    },
    layerStyles: {
      page: {
        pt: 24,
        pb: 16,
        px: [4, '8%'],
      },
      showScroll: {
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
      },
      hideScroll: {
        overflow: '-moz-scrollbars-none',
        MsOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          width: '0 !important',
          display: 'none',
          background: 'transparent',
        },
        cursor: 'grab',
      },
    },
    textStyles: {
      alt: {
        fontFeatureSettings: '"ss01"',
      },
      liga: {
        fontVariant: 'discretionary-ligatures',
      },
      highlight: {
        bgColor: 'highlight',
        borderRadius: 'lg',
        px: 1,
      },
    },
    colors: {
      brand: {
        50: '#e8f9f1',
        100: '#cffbd5',
        200: '#a0f8b5',
        300: '#6eec99',
        400: '#49d988',
        500: '#16c172',
        600: '#0dac63',
        700: '#0e8750',
        800: '#116a42',
        900: '#105738',
        dark: '#0c412a',
      },
      secondary: baseTheme.colors.yellow,
      accent: baseTheme.colors.purple,
      background: '#ffee99',
      text: baseTheme.colors.gray[800],
      highlight: '#a0f8b5',
      muted: '#ebfbcb',
      black: '#121113', // #01161e
    },
    sizes: {
      ...sizes,
      container: {
        max: '1680px',
      },
    },
    components,
    fonts,
    fontSizes,
    radii,
    zIndices,
    breakpoints,
    space,
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
)

export default theme
