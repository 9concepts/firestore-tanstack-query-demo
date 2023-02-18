'use client'

import { SwrDemo } from "@/components/SwrDemo";
import { createFirebaseClientApp } from "@/lib/firebase";

const SwrDemoPage = () => {
  createFirebaseClientApp()
  return (
    <div>
      <h2>SWR demo</h2>
      {/* Error: Fallback data is required when using suspense in SSR. */}
      {/* となって動かない */}
      {/* <SwrDemo /> */}
    </div>
  )
}

export default SwrDemoPage;
