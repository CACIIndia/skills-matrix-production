import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // 1. Redirect from the base URL to /dashboard
  if (pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }
 
  // 2. Handle public-profile route if ID is missing
  if (pathname.startsWith('/public-profile') && pathname === '/public-profile/') {
   
    // Fetch the id from localhost (for simplicity, default to 1 or simulate localhostId)
    const defaultId = '1'; // Set a default id
    const localhostId = '2'; // Simulated value, replace with real logic to get from cookies, etc.

    const id = localhostId || defaultId;

    // Redirect to the correct URL with the id
    url.pathname = `/public-profile/${id}`;
    return NextResponse.redirect(url);
  }

  // Continue to the next middleware or route if no condition is met
  return NextResponse.next();
}

// 3. Configure the matcher to apply middleware for both the base URL and public-profile routes
export const config = {
  matcher: ['/', '/public-profile/:path*'],
};
