import NextImage from 'next/image'
import { AspectRatio } from '@chakra-ui/react'
import { MotionPop } from '~components/motion'

interface AnimalPortraitProps {
  src: string
  delay?: number
}

export const AnimalPortrait = ({ delay, src }: AnimalPortraitProps) => {
  return (
    <MotionPop
      once
      flexGrow={1}
      flexShrink={1}
      flexBasis={['50%', null, 'auto', '50%']}
      delay={delay}
    >
      <AspectRatio w={['75%', null, '95%', '70%']} ratio={1}>
        <NextImage src={src} alt="cute animal portrait" fill />
      </AspectRatio>
    </MotionPop>
  )
}
