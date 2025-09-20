import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("MIDDLEWARE RUN:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;

  // Protect everything inside the "admin" group
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/contact-admin") ||
    request.nextUrl.pathname.startsWith("/education-admin") ||
    request.nextUrl.pathname.startsWith("/project-admin")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/contact-admin/:path*",
    "/education-admin/:path*",
    "/project-admin/:path*",
  ],
};

// export const config = {
//   matcher: ["/((dashboard|contact-admin|education-admin|project-admin))/ :path*"],
// };
