import { Variants } from 'framer-motion'
import { MotionFlex, MotionSpan } from '~components/motion'

import { ReactComponent as FaceOneSvg } from '~public/img/face-1.svg'
import { ReactComponent as FaceTwoSvg } from '~public/img/face-2.svg'
import { ReactComponent as FaceThreeSvg } from '~public/img/face-3.svg'
import { ReactComponent as FaceFourSvg } from '~public/img/face-4.svg'
import { ReactComponent as FaceFiveSvg } from '~public/img/face-5.svg'

const faceList: Variants = {
  in: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
  out: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
}

const face: Variants = {
  in: { y: 0, transition: { duration: 0.3 } },
  out: { y: '100%' },
}

interface MenuFacesProps {
  animate: boolean
  hovered: number
}

export const MenuFaces = ({ animate, hovered }: MenuFacesProps) => {
  return (
    <MotionFlex
      pos="absolute"
      bottom={0}
      alignItems="flex-end"
      w="100%"
      px={[10, null, null, '15%']}
      animate={animate ? 'in' : 'out'}
      variants={faceList}
      sx={{
        '& > span:nth-of-type(even)': {
          display: ['none', 'block'],
        },
      }}
    >
      <MotionSpan
        layout
        flex={1}
        height={20}
        bg="yellow.200"
        border="3px solid currentColor"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === 1 ? '32px' : 0}
        variants={face}
      >
        <MotionSpan layout="position" display="block">
          <FaceOneSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        height={32}
        bg="orange.300"
        border="3px solid currentColor"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === 2 ? '32px' : 0}
        variants={face}
      >
        <MotionSpan layout="position" display="block">
          <FaceTwoSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        h={24}
        bg="purple.300"
        border="3px solid currentColor"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === 3 ? '16px' : 0}
        paddingRight={hovered === 3 ? '16px' : 0}
        variants={face}
      >
        <MotionSpan layout="position" display="block">
          <FaceThreeSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        h={20}
        bg="pink.200"
        border="3px solid currentColor"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingRight={hovered === 4 ? '32px' : 0}
        variants={face}
      >
        <MotionSpan layout="position" display="block">
          <FaceFourSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        h={28}
        bg="green.400"
        border="3px solid currentColor"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingRight={hovered === 5 ? '32px' : 0}
        variants={face}
      >
        <MotionSpan layout="position" display="block">
          <FaceFiveSvg />
        </MotionSpan>
      </MotionSpan>
    </MotionFlex>
  )
}
