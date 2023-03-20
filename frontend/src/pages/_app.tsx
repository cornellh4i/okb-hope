import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../../../backend/firebase/AuthContext'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
