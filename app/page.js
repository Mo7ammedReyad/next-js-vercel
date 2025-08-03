import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import Link from 'next/link';

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');
  
  let user = null;
  if (token) {
    user = verifyToken(token.value);
  }

  const handleLogout = async () => {
    'use server';
    cookies().delete('auth-token');
  };

  return (
    <div className="container">
      <h1>مرحباً بك!</h1>
      
      {user && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            أهلاً {user.email}
          </p>
          <p style={{ color: '#666' }}>
            لقد قمت بتسجيل الدخول بنجاح
          </p>
        </div>
      )}

      <form action={handleLogout}>
        <button type="submit" style={{ backgroundColor: '#f44336' }}>
          تسجيل الخروج
        </button>
      </form>
    </div>
  );
}