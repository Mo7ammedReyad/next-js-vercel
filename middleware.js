import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // المسارات العامة
  const publicPaths = ['/login', '/signup', '/api/login', '/api/signup'];
  const isPublicPath = publicPaths.includes(path);
  
  // الحصول على التوكن من الكوكيز
  const token = request.cookies.get('auth-token')?.value || '';
  
  // التحقق من صحة التوكن
  const isValidToken = verifyToken(token);
  
  // إذا كان المسار محمي والمستخدم غير مسجل دخوله
  if (!isPublicPath && !isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // إذا كان المستخدم مسجل دخوله ويحاول الوصول لصفحات التسجيل
  if (isPublicPath && isValidToken && !path.startsWith('/api')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};