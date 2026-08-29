import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the token cookie set by the client-side Firebase Auth login
  const token = request.cookies.get('admin_token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  // If the user is trying to access an /admin route (except login) and has no token
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If the user is trying to access the login page but already has a token
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
};
