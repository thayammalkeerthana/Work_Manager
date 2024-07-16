import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware executed");
  const authToken = request.cookies.get("authToken")?.value;
  console.log("authToken", authToken);
  if (
    request.nextUrl.pathname == "/api/login" ||
    request.nextUrl.pathname == "/api/users"
  ) {
    return;
  }

  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/signup";

  if (loggedInUserNotAccessPaths) {
    //accessing not secured routes
    console.log("Have authToken");
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    //accessing secured route
    if (!authToken) {
      console.log("no authToken");
      if (request.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json(
          {
            message: "Access Denied !!",
            success: false,
          },
          {
            status: 400,
          }
        );
      }  
        return NextResponse.redirect(new URL("/login", request.url));
      
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/addTask", "/showTask", "/api/:path*"],
};
