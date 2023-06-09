import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routes } from './routes'

export function middleware(request: NextRequest) {

    if(!routes.includes(request.nextUrl.pathname)) {
        console.log("REDIRECT", request.nextUrl.pathname)
        return NextResponse.redirect(new URL('/home', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|_next/chunks|favicon.ico|login).*)',
    ],
}