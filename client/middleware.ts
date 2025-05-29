import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const protectedRoutes = [
  '/dashboard',
  '/users',

];
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/verify-email-message',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth')?.value;
  const { pathname } = request.nextUrl;


  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  if (token && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/users',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/verify-email-message',
  ],
};