import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLocaleLowerCase()) {
    return NextResponse.next()
  }

  //Redirect to lowercase
  const url = new URL(`${req.nextUrl.origin}${req.nextUrl.pathname.toLocaleLowerCase()}`)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/learn/:path*'],
}

// BUG: https://github.com/vercel/next.js/issues/38239
// New middleware causing 404 page not to be shown for notfound
// dyanimc routes when client-side navigating
// Possible fix in v13.2.4-canary.4
