import { Inter } from 'next/font/google'
import DiscoverPage from './discover'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <DiscoverPage />
    </main>
  )
}

