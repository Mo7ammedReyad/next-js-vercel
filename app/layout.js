import './globals.css'

export const metadata = {
  title: 'My Auth App',
  description: 'Simple authentication app with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}