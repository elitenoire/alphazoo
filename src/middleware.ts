import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ROUTES } from '~src/constants'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLocaleLowerCase()) {
    return NextResponse.next()
  }

  //Redirect to lowercase
  const url = new URL(`${req.nextUrl.origin}${req.nextUrl.pathname.toLocaleLowerCase()}`)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [`${ROUTES.learn}/:path*`],
}
