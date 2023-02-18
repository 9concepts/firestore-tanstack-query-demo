import { useFirestoreQueryDataSuspense } from '@/hooks/use-firestore-query-data-suspense'
import { collection, getFirestore, query } from 'firebase/firestore'
import React, { Suspense } from 'react'

export const QuerySuspenseHookDemo = () => {
  const q = query(collection(getFirestore(), 'books'))
  const { data: books } = useFirestoreQueryDataSuspense(["books"], q, { idField: 'id' })

  return (
    <div>QuerySuspenseHookDemo
      <Suspense fallback={<div>Loading QuerySuspenseHookDemo...</div>}>
        {books?.map((book) => <div key={book.id}>{book.title} ¥{book.price}</div>)}
      </Suspense>
    </div>
  )
}
