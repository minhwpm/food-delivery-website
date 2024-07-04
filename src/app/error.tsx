"use client"

import { useEffect } from 'react'
import Button from '@/components/Button/Button'
 
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="">
      <h2 className="">
        Something went wrong
      </h2>
      <div className="">
        <p>
          We’re sorry, the page you were looking for couldn’t be found. The link
          you followed may either be broken or no longer exist.
        </p>
        <p>
          Please try again, or go back to Home page by clicking the buttons
          below:
        </p>
      </div>
      <div>
        <Button onClick={() => reset()}>Try Again</Button>
        <span>OR</span>
        <Button url="/">Go to Home page</Button>
      </div>
    </div>
  )
}