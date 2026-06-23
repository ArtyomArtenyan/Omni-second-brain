import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const session = request.cookies.get('better-auth.session_token');

	const isAuthPage =
		request.nextUrl.pathname.startsWith('/sign-in') ||
		request.nextUrl.pathname.startsWith('/sign-up');

	const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

	if (isDashboard && !session) {
		return NextResponse.redirect(new URL('/sign-in', request.url));
	}

	if (isAuthPage && session) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/sign-in', '/sign-up'],
};
