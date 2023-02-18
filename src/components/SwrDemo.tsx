'use client'

import { collection, DocumentData, getFirestore, onSnapshot, Query, query } from 'firebase/firestore';
import { Suspense } from 'react';
import useSWR from 'swr'

type WithIdField<D, F = void> = F extends string
  ? D & { [key in F]: string }
  : D;

type ID = 'id'

const queryFn = (query: Query<DocumentData>) => {
  return new Promise<DocumentData[]>((resolve, reject) => {
    try {
      const unsubscribe = onSnapshot(query, (snapshot => {
        const docs = snapshot.docs.map(doc => {
          let data = doc.data()
          // if (options?.idField) {
          data = {
            ...data,
            id: doc.id
          }
          // }

          return data as WithIdField<DocumentData, ID>
        })

        console.log("in onSnapshot callback")
        // queryClient.setQueryData(queryKey, docs)
        resolve(docs)
      }))
    } catch (error) {
      reject(error)
    }
  })
}

export const SwrDemo = () => {
  const q = query(collection(getFirestore(), 'books'))

  const fetcher = () => queryFn(q)

  const { data } = useSWR('books/swr-demo', fetcher, { suspense: true })

  return (
    <div>
      <h2>SWR demo</h2>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          {data.map(book => <p key={book.id}>{book.title}: {book.price}</p>)}
        </Suspense>
      </div>
    </div>
  )
}
