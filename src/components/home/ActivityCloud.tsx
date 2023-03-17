import type { Variants, DraggableProps } from 'framer-motion'
import NextImage from 'next/image'
import { MotionBox, MotionFlex } from '~components/motion'
import { useIsLargeAndAbove, useIsSmallAndAbove } from '~/src/hooks/mediaQueries'

import ImgWow from '~public/img/cloud-wow.svg'
import ImgStar from '~public/img/cloud-star.svg'
import ImgFun from '~public/img/cloud-fun.svg'
import ImgSmiley from '~public/img/cloud-smiley.svg'

const container: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (isLg: boolean) => ({
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: 0.2,
      staggerChildren: isLg ? 0.15 : 0.185,
    },
  }),
}

const item: Variants = {
  hidden: ({ isLg }) => ({
    opacity: 0,
    x: 0,
    y: isLg ? -200 : 0,
  }),
  visible: ({ isLg, isSm, pos }) => ({
    opacity: 1,
    x: isLg ? 0 : `${(isSm ? 150 : 70) * pos}%`,
    y: isLg ? 250 + 25 * pos : 0,
    transition: { type: 'spring', duration: 1 },
  }),
}

export const ActivityCloud = ({ dragConstraints }: Pick<DraggableProps, 'dragConstraints'>) => {
  const [isSm] = useIsSmallAndAbove()
  const [isLg] = useIsLargeAndAbove()

  return (
    <MotionFlex
      position="relative"
      zIndex={1}
      flexDir={['column', null, null, 'row']}
      justifyContent={{ lg: 'center' }}
      maxW={['35vw', '20vw', null, 'none']}
      w="100%"
      mx="auto"
      pb={{ lg: 64 }}
      custom={isLg}
      initial="hidden"
      whileInView="visible"
      variants={container}
      viewport={{ once: true }}
      sx={{
        img: {
          pointerEvents: 'none',
        },
      }}
    >
      <MotionBox
        w="100%"
        maxW={{ lg: '15vw' }}
        cursor="grab"
        custom={{ isLg, isSm, pos: 1 }}
        variants={item}
        drag
        dragElastic={false}
        whileDrag={{ zIndex: 9999 }}
        dragConstraints={dragConstraints}
      >
        <NextImage src={ImgWow} alt="Wow text in cute cloud" unoptimized />
      </MotionBox>
      <MotionBox
        w="100%"
        maxW={{ lg: '15vw' }}
        cursor="grab"
        custom={{ isLg, isSm, pos: -1 }}
        variants={item}
        drag
        dragElastic={false}
        whileDrag={{ zIndex: 9999 }}
        dragConstraints={dragConstraints}
      >
        <NextImage src={ImgStar} alt="#1 text in cute star" unoptimized />
      </MotionBox>
      <MotionBox
        w="100%"
        maxW={{ lg: '15vw' }}
        cursor="grab"
        custom={{ isLg, isSm, pos: 1 }}
        variants={item}
        drag
        dragElastic={false}
        whileDrag={{ zIndex: 9999 }}
        dragConstraints={dragConstraints}
      >
        <NextImage src={ImgFun} alt="Fun text in cute chat bubble eyes" unoptimized />
      </MotionBox>
      <MotionBox
        w="100%"
        maxW={{ lg: '15vw' }}
        cursor="grab"
        custom={{ isLg, isSm, pos: -1 }}
        variants={item}
        drag
        dragElastic={false}
        whileDrag={{ zIndex: 9999 }}
        dragConstraints={dragConstraints}
      >
        <NextImage src={ImgSmiley} alt="Cute smiley emoji with heart eyes" unoptimized />
      </MotionBox>
    </MotionFlex>
  )
}
