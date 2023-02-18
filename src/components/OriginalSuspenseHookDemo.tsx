import { useFirestoreQueryDataSuspenseOriginal } from '@/hooks/use-firestore-query-data-suspense-original'
import { collection, getFirestore, query } from 'firebase/firestore'
import React, { Suspense } from 'react'

export const OriginalSuspenseHookDemo = () => {
  const q = query(collection(getFirestore(), 'books'))
  const { data: books } = useFirestoreQueryDataSuspenseOriginal(['books/original'], q, { idField: 'id' })

  return (
    <div>OriginalSuspenseHookDemo
      <div>
        <Suspense fallback={<div>Loading OriginalSuspenseHookDemo</div>}>
          {books?.map((book) => <div key={book.id}>{book.title} ¥{book.price}</div>)}
        </Suspense>
      </div>
    </div>
  )
}
