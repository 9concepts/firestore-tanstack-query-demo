'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataLoader } from "app/components/DataLoader";
import { ServerComponent } from "app/components/ServerComponent";
const queryClient = new QueryClient()

const Home = () => {
  return <div>
    <ServerComponent>Hi, from RSC</ServerComponent>
    <QueryClientProvider client={queryClient}>
      <DataLoader />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </div>
}

export default Home
