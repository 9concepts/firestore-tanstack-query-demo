import { createFirebaseClientApp } from '@/lib/firebase'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  createFirebaseClientApp()

  return <QueryClientProvider client={queryClient}><Component {...pageProps} /></QueryClientProvider>

}
