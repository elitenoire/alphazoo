import { ROUTES } from '~/src/constants'

export const routes = [
  {
    id: 1,
    name: 'Home',
    url: ROUTES.home,
    color: 'yellow.200',
    img: '/img/badge-panda.svg',
    imgAlt: 'cute panda bear',
  },
  {
    id: 2,
    name: 'Learn',
    url: ROUTES.learn,
    color: 'orange.300',
    img: '/img/badge-tiger.svg',
    imgAlt: 'cute tiger',
  },
  {
    id: 3,
    name: 'Play',
    url: ROUTES.play,
    color: 'purple.300',
    img: '/img/badge-monkey.svg',
    imgAlt: 'cute monkey',
  },
  {
    id: 4,
    name: 'Wiki',
    url: ROUTES.wiki,
    color: 'pink.200',
    img: '/img/badge-panda.svg',
    imgAlt: 'cute panda bear',
  },
  {
    id: 5,
    name: 'Profile',
    url: ROUTES.profile,
    color: 'green.400',
    img: '/img/badge-octo.svg',
    imgAlt: 'cute octopus',
  },
]

export const [ROUTE_1, ROUTE_2, ROUTE_3, ROUTE_4, ROUTE_5] = routes
