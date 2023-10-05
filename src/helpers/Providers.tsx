/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { type ReactNode } from 'react'

export default async function Providers (params: PageProps) {
  const queryClient = new QueryClient()
  return (
        <QueryClientProvider client={queryClient}>
            {params.children}
        </QueryClientProvider>
  )
}

interface PageProps {
  children: ReactNode
}
