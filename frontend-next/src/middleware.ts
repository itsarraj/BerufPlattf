import { NextRequest, NextResponse } from 'next/server';
import { selectIsAuthenticated } from './lib/slices/authSlice';
import { store } from './lib/store/store';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const state = store.getState();
  const isAuthenticated = selectIsAuthenticated(state);

  // Protected routes
  const protectedRoutes = ['/dashboard', '/settings'];
  const authRoutes = ['/login', '/register'];

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};