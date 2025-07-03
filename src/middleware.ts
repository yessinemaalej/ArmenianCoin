import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routing } from './i18n/routing';

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/admin',
];

// Define auth routes that should redirect to dashboard if already authenticated
const authRoutes = [
  '/auth/signin',
  '/auth/signup',
];

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const pathname = request.nextUrl.pathname;

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) || 
    routing.locales.some(locale => pathname.startsWith(`/${locale}${route}`))
  );

  // Check if the path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route) || 
    routing.locales.some(locale => pathname.startsWith(`/${locale}${route}`))
  );

  // If it's a protected route and user is not authenticated, redirect to sign in
  if (isProtectedRoute && !isAuthenticated) {
    const locale = pathname.split('/')[1];
    const isLocale = routing.locales.includes(locale as any);
    
    const signInUrl = new URL(
      isLocale ? `/${locale}/auth/signin` : '/auth/signin', 
      request.url
    );
    
    // Add the current path as a callback parameter
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If it's an auth route and user is already authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    const locale = pathname.split('/')[1];
    const isLocale = routing.locales.includes(locale as any);
    
    const dashboardUrl = new URL(
      isLocale ? `/${locale}/dashboard` : '/dashboard', 
      request.url
    );
    
    return NextResponse.redirect(dashboardUrl);
  }

  // For all other routes, use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};