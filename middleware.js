// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth'; // <-- تم تعديل المسار هنا

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // المسارات العامة اللي مش محتاجة تسجيل دخول
  const publicPaths = ['/login', '/signup', '/api/login', '/api/signup'];
  const isPublicPath = publicPaths.includes(path);
  
  // الحصول على التوكن من الكوكيز
  const token = request.cookies.get('auth-token')?.value || '';
  
  // التحقق من صحة التوكن
  const isValidToken = verifyToken(token);
  
  // لو المستخدم بيحاول يدخل صفحة خاصة وهو مش مسجل دخوله
  if (!isPublicPath && !isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // لو المستخدم مسجل دخوله وبيحاول يدخل صفحة تسجيل الدخول أو التسجيل
  if (isPublicPath && isValidToken && !path.startsWith('/api')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
