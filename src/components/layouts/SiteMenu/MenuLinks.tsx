import NextLink from 'next/link'
import { motion } from 'framer-motion'
import type { ListProps, ListItemProps } from '@chakra-ui/react'
import { List, ListItem, Link } from '@chakra-ui/react'
import { routes } from './routes'
import { container, listItem } from './variants'

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
        counterReset: 'sitemenu',
        li: {
          position: 'relative',
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
        },
      }}
    >
      {routes.map((route) => (
        <MotionListItem key={route.id} variants={listItem}>
          <NextLink href={route.url} passHref>
            <Link onMouseEnter={onHoverStart(route.id)} onMouseLeave={onHoverEnd}>
              {route.name}
            </Link>
          </NextLink>
        </MotionListItem>
      ))}
    </MotionList>
  )
}
