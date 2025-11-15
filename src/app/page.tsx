import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { caller, getQueryClient, trpc } from '@/trpc/server';
import React, { Suspense } from 'react'
import Client from './Client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async () => {

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());


  return (
    <div className={cn("text-blue-500")}>
      <Button variant="outline">Hello World</Button>
      {/* passing data from server component to client component:  */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading client component...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default page 