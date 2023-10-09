'use client';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Providers(params: PageProps){
    const queryClient = new QueryClient();
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {params.children}
            </QueryClientProvider>
        </SessionProvider>
    )
}

interface PageProps {
  children: ReactNode
}
