// import { useRef, useCallback } from 'react'
import NextImage from 'next/future/image'
import type { Variant, Variants } from 'framer-motion'
import { MotionBox, MotionFlex } from '~components/motion'
import { useIsAboveMobile } from '~/src/hooks/mediaQueries'

import ImgWow from '~public/img/cloud-wow.svg'
import ImgStar from '~public/img/cloud-star.svg'
import ImgFun from '~public/img/cloud-fun.svg'
import ImgSmiley from '~public/img/cloud-smiley.svg'

const containerVisible = (staggerBy?: number): Variant => ({
  opacity: 1,
  transition: {
    when: 'beforeChildren',
    delayChildren: 0.3,
    staggerChildren: staggerBy ?? 0.1,
  },
})

const container: Variants = {
  hidden: {
    opacity: 0,
  },
  visibleMobile: containerVisible(0.3),
  visible: containerVisible(0.1),
}

const item: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 0,
  },
  visibleMobile: (d: -1 | 1 = 1) => ({
    opacity: 1,
    x: 80 * d,
    y: 0,
    transition: { type: 'spring', duration: 1 },
  }),
  visible: (d: number) => ({
    opacity: 1,
    x: `${Math.cos((Math.PI * d) / 180) * 40 + (d < 90 ? -1 : 1) * 7.5}vw`,
    y: `${Math.sin((Math.PI * d) / 180) * 20}vw`,
    transition: { type: 'spring', duration: 1.5 },
  }),
}

export const ActivityCloud = () => {
  const [isAboveMobile] = useIsAboveMobile()

  // buggy: Attempt to detect scroll direction whileinview
  // const previousY = useRef(0)
  // const scrollDir = useRef(1)

  // const handleViewportEnter = useCallback((entry: IntersectionObserverEntry | null) => {
  //   const currentY = entry?.boundingClientRect.y ?? 0
  //   console.log({
  //     prev: previousY.current,
  //     curr: currentY,
  //     intersecting: entry?.isIntersecting,
  //     entry,
  //   })
  //   // scrolling up
  //   if (currentY < previousY.current) {
  //     scrollDir.current = 1
  //   } else {
  //     //scrolling down
  //     scrollDir.current = -1
  //   }
  //   // update y position
  //   previousY.current = currentY
  //   console.log({ scroll: scrollDir.current, pos: scrollDir.current === 1 ? 'up' : 'down' })
  // }, [])

  return (
    <MotionFlex
      position="relative"
      flexDir="column"
      maxW={[32, '15vw']}
      w="100%"
      mx="auto"
      pb={[null, 96]}
      initial="hidden"
      variants={container}
      whileInView={isAboveMobile ? 'visible' : 'visibleMobile'}
      // onViewportEnter={handleViewportEnter}
      viewport={{ once: true }}
    >
      <MotionBox
        pos={[null, 'absolute']}
        top={0}
        w="100%"
        custom={isAboveMobile ? 178 : 1}
        variants={item}
      >
        <NextImage src={ImgWow} alt="Wow text in cute cloud" />
      </MotionBox>
      <MotionBox
        pos={[null, 'absolute']}
        top={0}
        w="100%"
        custom={isAboveMobile ? 120 : -1}
        variants={item}
      >
        <NextImage src={ImgStar} alt="#1 text in cute star" />
      </MotionBox>
      <MotionBox
        pos={[null, 'absolute']}
        top={0}
        w="100%"
        custom={isAboveMobile ? 60 : 1}
        variants={item}
      >
        <NextImage src={ImgFun} alt="Fun text in cute chat bubble eyes" />
      </MotionBox>
      <MotionBox
        pos={[null, 'absolute']}
        top={0}
        w="100%"
        custom={isAboveMobile ? 2 : -1}
        variants={item}
      >
        <NextImage src={ImgSmiley} alt="Cute smiley emoji with heart eyes" />
      </MotionBox>
    </MotionFlex>
  )
}
