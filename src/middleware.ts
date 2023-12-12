import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// match which paths this middleware will be called on
export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/",
    "/dashboard",
    "/onboarding",
    "/onboarding/success",
  ],
};

const serverURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

interface ITokens {
  access: IToken; // IToken defined in global types
  refresh: IToken; // IToken defined in global types
}

interface IRefreshTokenResponse {
  tokens?: ITokens;
}

/**
 * Redirects the user to the specified URL.
 *
 * @param url - The URL to redirect to.
 * @param baseUrl - The base URL to resolve the relative URL against.
 * @return The response object representing the redirect.
 */
function redirect(url: string, baseUrl: string) {
  return NextResponse.redirect(new URL(url, baseUrl));
}

/**
 * Redirects the user based on authentication status and next URL.
 * If the user is not signed in and accessing a protected route, redirect to the signin page,
 * If the user is signed in and accessing sign in or sign up pages, redirect to the home page
 * @param request - The request object.
 * @param isAuthenticated - Indicates if the user is authenticated. Default is false.
 * @param nxtResponse - The optional NextResponse object.
 * @return The NextResponse object or a redirect response.
 */
function redirectWithAuth(
  request: NextRequest,
  isAuthenticated: Boolean = false,
  nxtResponse?: NextResponse
) {
  const { pathname } = request.nextUrl;
  // if the user is not authenticated and the next url is not /signin or /signup
  if (!isAuthenticated) {
    if (pathname !== "/signin" && pathname !== "/signup") {
      return redirect("/signin", request.url);
    }
  } else {
    // if the user is authenticated and the next url is /signin or /signup
    if (pathname === "/signin" || pathname === "/signup") {
      // redirect to the home page
      return redirect("/", request.url);
    }
  }
  return nxtResponse || NextResponse.next();
}

/**
 * Sets cookies (JWT Tokens) in the response object.
 *
 * @param response - The response object.
 * @param tokens - The tokens object containing access and refresh tokens.
 * @return The updated response object with cookies set.
 */
function setCookies(response: NextResponse, tokens: ITokens): NextResponse {
  const { access, refresh } = tokens;
  if (access.token) {
    response.cookies.set("accessToken", access.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(access.expires),
    });
  }
  if (refresh.token) {
    response.cookies.set("refreshToken", refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(refresh.expires),
    });
  }
  return response;
}

// refresh JWT tokens from server

/**
 * Refreshes the authentication tokens for the given request.
 *
 * @param request - The request object.
 * @return - A promise that resolves when the token refresh is complete.
 */
async function refreshTokens(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  if (!refreshToken) {
    return redirectWithAuth(request);
  }
  try {
    const response = await fetch(`${serverURL}/api/v1/auth/refresh-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshToken.value }),
    });
    const result: IRefreshTokenResponse = await response.json();
    // check if response is ok
    if (response.ok && result?.tokens) {
      const nxtResponse = NextResponse.next();
      // set the access token and refresh token in the cookies,
      // we cannot redirect after setting cookies or they will be lost
      // TODO: Fix bug - after access token is expired and if we redirect to /signin or /signup it does not get redirected to /
      return setCookies(nxtResponse, result.tokens);
    } else {
      return redirectWithAuth(request);
    }
  } catch (error) {
    return redirectWithAuth(request);
  }
}

/**
 * Checks the authorization of a given request.
 *
 * @param request - The request to check authorization for.
 * @return Returns a promise that resolves to nothing.
 */
async function checkAuthorization(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  if (!accessToken) {
    return await refreshTokens(request);
  }
  try {
    const response = await fetch(`${serverURL}/api/v1/auth/verify-auth`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${accessToken?.value}`,
      },
    });
    if (response.ok) {
      return redirectWithAuth(request, true);
    } else {
      // try to refresh the tokens, if not, it will redirect to signin
      return await refreshTokens(request);
    }
  } catch (error) {
    return redirectWithAuth(request);
  }
}

/**
 * Executes the middleware function.
 * this middleware will be called on all the protected routes specified in the matcher config
 *
 * @param request - The request object.
 * @return - A promise that resolves when the middleware function completes.
 */
export async function middleware(request: NextRequest) {
  return await checkAuthorization(request);
}
