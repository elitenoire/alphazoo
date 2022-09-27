import { useRef } from 'react'
import { useInView, useTransform, useScroll, useSpring, MotionValue } from 'framer-motion'
import { Box } from '@chakra-ui/react'
import { MotionBox, MotionFlex } from '~components/motion'

import { ReactComponent as BackdropSVG } from '~public/img/plx-01-backdrop.svg'

const spring = {
  type: 'spring',
  stiffness: 30,
  delay: 0.2,
}

function useFloatSpring(
  value: MotionValue<number>,
  speed: number,
  stiffness: number,
  inView = true
) {
  const vt = useTransform(value, (v) => (inView ? v / speed : 0))
  return useSpring(vt, { stiffness })
}
export default function Hero() {
  const heroBgRef = useRef(null)

  const isInView = useInView(heroBgRef)

  // Animate animals on scroll
  const { scrollY } = useScroll()

  const backAnimalsY = useFloatSpring(scrollY, 3.5, 65, isInView)
  const frontAnimalsY = useFloatSpring(scrollY, 4, 35, isInView)

  // Scroll transition to next section
  const { scrollYProgress } = useScroll({
    target: heroBgRef,
  })

  const radius = useTransform(scrollYProgress, [0.5, 1], ['0vmin', '80vmin'])
  const scaleX = useTransform(scrollYProgress, [0.5, 1], [1, 0.95])

  // Mouse Parallax
  const mouseX = useSpring(0, { stiffness: 60 })
  const mouseY = useSpring(0, { stiffness: 60 })

  const topFoliageX = useTransform(mouseX, (v) => v / 30)
  const topFoliageY = useTransform(mouseY, (v) => Math.min(v / 30, 0))
  const bottomFoliageX = useTransform(mouseX, (v) => v / 10)
  const bottomFoliageY = useTransform(mouseY, (v) => -v / 15)
  const backAnimalsX = useTransform(mouseX, (v) => v / 20)
  const frontAnimalsX = useTransform(mouseX, (v) => v / 25)

  return (
    <MotionFlex
      ref={heroBgRef}
      pos="relative"
      overflow="hidden"
      h="130vh"
      minH="31.25em"
      onMouseMove={function (event) {
        const offsetX = event.clientX - window.innerWidth / 2
        const offsetY = event.clientY - window.innerWidth / 2

        mouseX.set(-offsetX)
        mouseY.set(offsetY)

        backAnimalsY.set(-offsetY / 15)
        frontAnimalsY.set(-offsetY / 15)
      }}
      style={{
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        scaleX,
      }}
    >
      <Box
        as={BackdropSVG}
        pos="absolute"
        w="100%"
        h="100%"
        fill="yellow.300"
        preserveAspectRatio="xMidYMid slice"
      />
      <MotionBox
        pos="absolute"
        left="-5%"
        w="110%"
        h="100%"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImg="url('./img/plx-02-topfoliage.svg')"
        initial={{ y: '-15%', scale: 1.5 }}
        animate={{ y: '0', scale: 1 }}
        // @ts-expect-error from chakra-ui official docs
        transition={{ delay: 0.5, duration: 0.65, ease: 'easeInOut' }}
        style={{ x: topFoliageX, y: topFoliageY }}
      />
      <MotionBox
        pos="absolute"
        left="-5%"
        w="110%"
        h="100%"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImg="url('./img/plx-03-backanimals.svg')"
        bgPos="center"
        animate={{ y: '0', opacity: 1, transition: spring }}
        initial={{ y: '10%', opacity: 0 }}
        style={{ x: backAnimalsX, y: backAnimalsY }}
      />
      <MotionBox
        pos="absolute"
        left="-5%"
        w="110%"
        h="100%"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImg="url('./img/plx-04-frontanimals.svg')"
        bgPos="center"
        animate={{ y: '0', scale: 1, opacity: 1, transition: spring }}
        initial={{ y: '10%', scale: 1.3, opacity: 0 }}
        style={{ x: frontAnimalsX, y: frontAnimalsY }}
      />
      <MotionBox
        pos="absolute"
        w="100%"
        h="100%"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImg="url('./img/plx-05-bottomfoliage.svg')"
        bgPos="center"
        style={{ x: bottomFoliageX, y: bottomFoliageY }}
      />
    </MotionFlex>
  )
}
