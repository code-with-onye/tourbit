import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../routes";

// function matchRoute(path: string, patterns: string[]): boolean {
//   return patterns.some((pattern) => new RegExp(`^${pattern}$`).test(path));
// }

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const userStorageCookie = request.cookies.get("tourbit-user-storage")?.value;

  let isAuthenticated = false;
  let user = null;

  if (userStorageCookie) {
    try {
      const parsedStorage = JSON.parse(userStorageCookie);
      isAuthenticated = parsedStorage.state.isAuthenticated;
      user = {
        email: parsedStorage.state.user.email,
        name: parsedStorage.state.user.name,
        userId: parsedStorage.state.user.sub,
        token: parsedStorage.state.user.access_token,
      };

    } catch (error) {
      console.error("Error parsing user-storage cookie:", error);
    }
  } else {
    console.log("No user-storage cookie found");
  }

  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  //   if (isAuthenticated && user && typeof user.user.role === "string") {
  //     const userRole = user.user.role as keyof typeof roleBasedRoutes;
  //     const allowedRoutes = roleBasedRoutes[userRole] || [];

  //     if (!matchRoute(path, allowedRoutes) && !isPublicRoute) {
  //       return NextResponse.redirect(new URL("/access_denied", request.url));
  //     }
  //   }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", user ? JSON.stringify(user) : "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
