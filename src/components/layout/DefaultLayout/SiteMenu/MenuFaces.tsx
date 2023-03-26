import { MotionFlex, MotionSpan } from '~components/motion'

import { ReactComponent as FaceOneSvg } from '~public/img/menu-face-1.svg'
import { ReactComponent as FaceTwoSvg } from '~public/img/menu-face-2.svg'
import { ReactComponent as FaceThreeSvg } from '~public/img/menu-face-3.svg'
import { ReactComponent as FaceFourSvg } from '~public/img/menu-face-4.svg'
import { ReactComponent as FaceFiveSvg } from '~public/img/menu-face-5.svg'

import { ROUTE_1, ROUTE_2, ROUTE_3, ROUTE_4, ROUTE_5 } from './routes'
import { container, faceItem } from './variants'

interface MenuFacesProps {
  hovered: number
}

export const MenuFaces = ({ hovered }: MenuFacesProps) => {
  return (
    <MotionFlex
      alignItems="flex-end"
      w="full"
      px={[10, null, null, '15%']}
      overflow="hidden"
      variants={container}
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
        bg={ROUTE_1.color}
        border="3px solid"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === ROUTE_1.id ? '32px' : 0}
        variants={faceItem}
      >
        <MotionSpan layout="position" display="block">
          <FaceOneSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        height={32}
        bg={ROUTE_2.color}
        border="3px solid"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === ROUTE_2.id ? '32px' : 0}
        variants={faceItem}
      >
        <MotionSpan layout="position" display="block">
          <FaceTwoSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        h={24}
        bg={ROUTE_3.color}
        border="3px solid"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === ROUTE_3.id ? '32px' : 0}
        variants={faceItem}
      >
        <MotionSpan layout="position" display="block">
          <FaceThreeSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        h={20}
        bg={ROUTE_4.color}
        border="3px solid"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingLeft={hovered === ROUTE_4.id ? '32px' : 0}
        variants={faceItem}
      >
        <MotionSpan layout="position" display="block">
          <FaceFourSvg />
        </MotionSpan>
      </MotionSpan>
      <MotionSpan
        layout
        flex={1}
        h={28}
        bg={ROUTE_5.color}
        border="3px solid"
        borderBottomWidth={0}
        borderTopRadius="full"
        paddingRight={hovered === ROUTE_5.id ? '32px' : 0}
        variants={faceItem}
      >
        <MotionSpan layout="position" display="block">
          <FaceFiveSvg />
        </MotionSpan>
      </MotionSpan>
    </MotionFlex>
  )
}
