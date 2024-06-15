import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import api from "./lib/api";

const log = (...data: any[]) => console.log("[Middleware]", ...data);
const PUBLIC_ROUTES = [/^(\/)?$/, /^\/auth/];

export async function middleware(request: NextRequest) {
  if (PUBLIC_ROUTES.some((regexp) => regexp.test(request.nextUrl.pathname))) {
    return NextResponse.next();
  }

  const redirectUrl = `${request.nextUrl.origin}/auth/login`;

  if (!request.cookies.get("session_id")) {
    return NextResponse.redirect(redirectUrl);
  }

  log(request.url);
  try {
    const cookie = request.headers.get("cookie");
    await api.get("/auth/me", { headers: { Cookie: cookie } });

    return NextResponse.next();
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      log("Unauthorized", error.response?.status);
      return NextResponse.redirect(redirectUrl);
    } else {
      console.error(error);
      return NextResponse.error();
    }
  }
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
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
