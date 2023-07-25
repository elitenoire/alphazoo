import NextLink from 'next/link'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { Box, Circle, List, ListItem, AspectRatio, useModalContext } from '@chakra-ui/react'
import { SfxLink } from '~components/sfx'
import { routes } from './routes'
import { container, navItem } from './variants'

import frameUrl from '~public/img/menu-frame.svg'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

interface MenuLinksProps {
  onHoverStart: (id: number) => () => void
  onHoverEnd: () => void
}

export const MenuLinks = ({ onHoverStart, onHoverEnd }: MenuLinksProps) => {
  const { onClose } = useModalContext()

  return (
    <MotionList
      variants={container}
      sx={{
        position: 'relative',
        counterReset: 'sitemenu',
        li: {
          counterIncrement: 'sitemenu',
        },
        a: {
          display: 'inline-block',
          borderBottom: '3px solid',
          fontWeight: 'bold',
          fontSize: ['f2xl', null, null, 'fxl'],
          pt: [1, null, null, 2],
          transformOrigin: 'left bottom',
          ':before': {
            content: 'counters(sitemenu, "", decimal-leading-zero)',
            mr: 8,
            fontSize: '0.35em',
            opacity: 0.5,
          },
          ':hover': {
            textDecoration: 'none',
            transform: ['scale(1.125)', null, null, 'scale(1.25)'],
          },
          ':hover + div > div:first-of-type': {
            opacity: 1,
            transform: 'translateX(0em) scale(1) rotate(0deg)',
          },
          ':hover + div > div:last-of-type': {
            opacity: 1,
            transform: 'scale(1.185)',
          },
        },
      }}
    >
      {routes.map((route) => (
        <MotionListItem key={route.id} variants={navItem}>
          <SfxLink
            as={NextLink}
            href={route.url}
            onClick={onClose}
            onMouseEnter={onHoverStart(route.id)}
            onMouseLeave={onHoverEnd}
          >
            {route.name}
          </SfxLink>
          <Box
            pos="absolute"
            top="50%"
            left="60%"
            display={['none', null, null, 'block']}
            transform="translate(-50%,-50%)"
          >
            <Circle
              p={6}
              opacity={0}
              border="4px solid"
              transform="translateX(-10em) scale(0.35) rotate(-5deg)"
              size="2xs"
              transitionDuration="ultra-slow"
              transitionProperty="opacity,transform"
              transitionTimingFunction="ease"
            >
              <AspectRatio w="full" ratio={1}>
                <NextImage src={route.img} alt={route.imgAlt} fill unoptimized />
              </AspectRatio>
            </Circle>
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="full"
              opacity={0}
              transform="scale(1.375)"
              transitionDuration="ultra-slow"
              transitionProperty="opacity,transform"
              transitionTimingFunction="ease"
            >
              <NextImage src={frameUrl} alt="" unoptimized />
            </Box>
          </Box>
        </MotionListItem>
      ))}
    </MotionList>
  )
}
