import { useFirestoreQuery } from '@/hooks/use-firestore-query'
import { Book } from '@/models/book'
import { collection, getFirestore, query } from 'firebase/firestore'
import React from 'react'

export const HookDemo = () => {
  const q = query(collection(getFirestore(), 'books'))
  const { data: snapshot, isLoading } = useFirestoreQuery(["books/hooks-demo"], q)

  if (isLoading || !snapshot) return <div>Loading HookDemo...</div>

  const books = snapshot.docs.map(doc => Book.parse({ id: doc.id, ...doc.data() }))

  return (
    <div>
      HookDemo
      {books.map((book) => <div key={book.id}>{book.title} ¥{book.price}</div>)}
    </div>
  )
}
