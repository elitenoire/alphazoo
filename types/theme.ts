import type { ColorHues, Theme } from '@chakra-ui/react'

// https://stackoverflow.com/a/69756175/18292684
export type PickByType<T, Value> = {
  [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

export type ChakraColorHues = keyof PickByType<Theme['colors'], ColorHues>
