import NextLink from 'next/link'
import { motion } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { Box, Circle, List, ListItem, Link } from '@chakra-ui/react'
import { routes } from './routes'
import { container, navItem } from './variants'

const MotionList = motion<ListProps>(List)
const MotionListItem = motion<ListItemProps>(ListItem)

interface MenuLinksProps {
  onHoverStart: (id: number) => () => void
  onHoverEnd: () => void
}

export const MenuLinks = ({ onHoverStart, onHoverEnd }: MenuLinksProps) => {
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
          borderBottom: '3px solid currentColor',
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
          ':hover + div': {
            zIndex: 10,
          },
          ':hover + div > div': {
            opacity: 1,
            transform: 'translateX(0em) scale(1) rotate(0deg)',
          },
        },
      }}
    >
      {routes.map((route) => (
        <MotionListItem key={route.id} variants={navItem}>
          <NextLink href={route.url} passHref>
            <Link onMouseEnter={onHoverStart(route.id)} onMouseLeave={onHoverEnd}>
              {route.name}
            </Link>
          </NextLink>
          <Box pos="absolute" top="50%" left="60%" transform="translate(-50%,-50%)">
            <Circle
              bg="brand.200"
              opacity={0}
              transform="translateX(-10em) scale(0.35) rotate(-5deg)"
              size="3xs"
              transitionDuration="ultra-slow"
              transitionProperty="opacity,transform"
              transitionTimingFunction="ease"
            ></Circle>
          </Box>
        </MotionListItem>
      ))}
    </MotionList>
  )
}
