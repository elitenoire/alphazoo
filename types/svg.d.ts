declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  import type { StaticImageData } from 'next/future/image'

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>

  const content: StaticImageData
  export default content
}
