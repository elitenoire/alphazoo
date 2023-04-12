declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  import type { StaticImageData } from 'next/image'

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>

  const content: StaticImageData
  export default content
}

declare module 'react-use-keypress' {
  export default function useKeyPress(
    key: KeyboardEvent['key'] | KeyboardEvent['key'][],
    callback?: (e: KeyboardEvent) => void
  ): void
}
