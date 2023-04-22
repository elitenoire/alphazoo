import type { ValueOf } from '~/types/utility'

export const ROUTES = {
  home: '/',
  learn: '/learn',
  play: '/play',
  profile: '/profile',
  wiki: '/wiki',
} as const

export type RoutePath = ValueOf<typeof ROUTES>
