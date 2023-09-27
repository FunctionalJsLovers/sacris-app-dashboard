'use client';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from 'react';


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Providers(params: PageProps){
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {params.children}
        </QueryClientProvider>
    )
}

interface PageProps {
    children: ReactNode;
}