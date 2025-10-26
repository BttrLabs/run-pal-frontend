import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // First, handle internationalization
  const response = intlMiddleware(request);

  // Check if we're on the login page - if so, skip auth check
  const { pathname } = request.nextUrl;
  if (pathname.includes("/login")) {
    return response;
  }

  // Check for session cookie
  const sessionCookie = getSessionCookie(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    // Get the locale from the pathname
    const locale = pathname.split("/")[1];
    const loginUrl = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/login`,
      request.url,
    );
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
