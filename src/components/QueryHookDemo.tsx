import { useFirestoreQueryData } from '@/hooks/use-firestore-query-data'
import { Book } from '@/models/book'
import { collection, getFirestore, query } from 'firebase/firestore'
import React from 'react'

export const QueryHookDemo = () => {
  const q = query(collection(getFirestore(), 'books'))
  const { data } = useFirestoreQueryData(["books"], q, { idField: 'id' })
  if (!data) return (<div>Loading...</div>)
  const books = data.map(doc => Book.parse(doc));
  return (
    <div>QueryHookDemo
      {books.map((book) => <div key={book.id}>{book.title} ¥{book.price}</div>)}
    </div>
  )
}
