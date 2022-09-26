import { useEffect, forwardRef, ForwardRefRenderFunction, ReactNode, ComponentProps } from 'react'
import dynamic from 'next/dynamic'
import { motion, useMotionValue, MotionValue, useMotionTemplate } from 'framer-motion'
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

interface AnimalHeadProps extends AspectRatioProps {
  animal: keyof typeof animalsMap
  size?: string | number
  title?: string
  fill?: string
  x?: MotionValue<number>
  y?: MotionValue<number>
  children?: ReactNode
}

const AnimalHeadBase: ForwardRefRenderFunction<HTMLDivElement, AnimalHeadProps> = (
  {
    animal,
    size = '2xs',
    title,
    bg = 'yellow.200',
    fill = 'blackAlpha.50',
    x,
    y,
    children,
    ...rest
  },
  ref
) => {
  const haloFill = useToken('colors', fill, 'transparent')
  const AnimalSVG = animalsMap[animal]

  const _x = useMotionValue(0)
  const _y = useMotionValue(0)

  const transform = useMotionTemplate`translate(${_x}em,${_y}em)`

  useEffect(() => {
    const unsubX = x?.onChange((v) => {
      _x.set(v / 5)
    })
    const unsubY = y?.onChange((v) => {
      _y.set(v / 5)
    })

    return () => {
      unsubX?.()
      unsubY?.()
    }
  }, [_x, _y, x, y])

  return (
    <AspectRatio ref={ref} w="full" maxW={size} ratio={1} {...rest}>
      <Box overflow="initial !important" bg={bg} borderRadius="full">
        <AnimalSVG width="70%" fill={haloFill} />
        <Heading as="p" pos="absolute" top="-0.25em" opacity={0.9} size="2xl">
          {animal}
        </Heading>
        {(title || children) && (
          <Heading as="p" pos="absolute" bottom="-0.5em" size="4xl">
            <motion.span style={{ transform, display: 'inline-block' }}>
              {children ?? title}
            </motion.span>
          </Heading>
        )}
      </Box>
    </AspectRatio>
  )
}

export const AnimalHead = forwardRef(AnimalHeadBase)
