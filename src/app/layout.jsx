import '../index.css'
import { Providers } from '../next/Providers.jsx'

export const metadata = {
  title: 'Invoice Management',
  description: 'Invoice management app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

