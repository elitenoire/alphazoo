import { forwardRef, ForwardRefRenderFunction, ComponentProps } from 'react'
import dynamic from 'next/dynamic'
import { AspectRatioProps, AspectRatio, Box, Heading, useToken } from '@chakra-ui/react'

const animalsMap = {
  bear: dynamic<ComponentProps<'svg'>>(() =>
    import('~public/img/hd-bear.svg').then((m) => m.ReactComponent)
  ),
  frog: dynamic<ComponentProps<'svg'>>(() =>
    import('~public/img/hd-frog.svg').then((m) => m.ReactComponent)
  ),
  lion: dynamic<ComponentProps<'svg'>>(() =>
    import('~public/img/hd-lion.svg').then((m) => m.ReactComponent)
  ),
  rabbit: dynamic<ComponentProps<'svg'>>(() =>
    import('~public/img/hd-rabbit.svg').then((m) => m.ReactComponent)
  ),
  squirrel: dynamic<ComponentProps<'svg'>>(() =>
    import('~public/img/hd-squirrel.svg').then((m) => m.ReactComponent)
  ),
  tiger: dynamic<ComponentProps<'svg'>>(() =>
    import('~public/img/hd-tiger.svg').then((m) => m.ReactComponent)
  ),
}

export type AnimalHeadType = keyof typeof animalsMap

interface AnimalHeadProps extends AspectRatioProps {
  animal: AnimalHeadType
  size?: string | number
  title?: string
  fill?: string
}

const AnimalHeadBase: ForwardRefRenderFunction<HTMLDivElement, AnimalHeadProps> = (
  { animal, size = '2xs', title, bg = 'yellow.200', fill = 'blackAlpha.50', children, ...rest },
  ref
) => {
  const haloFill = useToken('colors', fill, 'transparent')
  const AnimalSVG = animalsMap[animal]

  return (
    <AspectRatio ref={ref} w="full" maxW={size} ratio={1} {...rest}>
      <Box overflow="initial !important" bg={bg} rounded="full">
        <AnimalSVG width="70%" fill={haloFill} />
        <Heading as="p" pos="absolute" top="-0.25em" opacity={0.9} size="2xl">
          {animal}
        </Heading>
        {(title || children) && (
          <Heading as="p" pos="absolute" bottom="-0.5em" size="4xl">
            {children ?? title}
          </Heading>
        )}
      </Box>
    </AspectRatio>
  )
}

export const AnimalHead = forwardRef(AnimalHeadBase)