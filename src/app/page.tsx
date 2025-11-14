import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

const page = () => {
  return (
    <div className={cn("text-red-500")}>
      <Button variant="outline">Hello World</Button>
    </div>
  )
}

export default page 