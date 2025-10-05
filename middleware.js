// middleware.js
import { NextResponse } from "next/server";

// Protect these routes
const protectedRoutes = [
  "/dashboard",
  "/resume",
  "/interview",
  "/ai-cover-letter",
  "/onboarding",
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // If route is not protected → allow
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check auth token (e.g., cookie named "token")
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Not logged in → redirect to login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists → continue
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume/:path*",
    "/interview/:path*",
    "/ai-cover-letter/:path*",
    "/onboarding/:path*",
  ],
};
