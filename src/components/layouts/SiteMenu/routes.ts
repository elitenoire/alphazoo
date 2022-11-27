import { ROUTES } from '~/src/constants'

export const routes = [
  {
    id: 1,
    name: 'Home',
    url: ROUTES.home,
    color: 'yellow.200',
    img: '',
  },
  {
    id: 2,
    name: 'Learn',
    url: ROUTES.learn,
    color: 'orange.300',
    img: '',
  },
  {
    id: 3,
    name: 'Play',
    url: ROUTES.play,
    color: 'purple.300',
    img: '',
  },
  {
    id: 4,
    name: 'Wiki',
    url: ROUTES.wiki,
    color: 'pink.200',
    img: '',
  },
  {
    id: 5,
    name: 'Profile',
    url: ROUTES.profile,
    color: 'green.400',
    img: '',
  },
]

export const [ROUTE_1, ROUTE_2, ROUTE_3, ROUTE_4, ROUTE_5] = routes
