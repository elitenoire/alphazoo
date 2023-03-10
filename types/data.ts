import type { ChakraColorHues } from '~types/theme'

export type Alphabet =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'

type LetterGlyph = {
  name: Alphabet
  type: 'letter'
}

type EmojiGlyph = {
  name: string
  type: 'emoji'
  color: string
}

export type GlyphType = EmojiGlyph | LetterGlyph

export type WikiType = {
  animal: string
  wiki: string
  img: string
  imgRatio: number
  colorScheme: ChakraColorHues
  tintBg?: boolean
}

export type AlphabetType = {
  numeral: number
  name: Alphabet
  bg: string
}
