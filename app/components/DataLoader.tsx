'use client'

import { useFirestoreQueryData } from "@/hooks/use-firestore-query-data"
import { createFirebaseClientApp } from "@/lib/firebase"
import { collection, getFirestore, query } from "firebase/firestore"
import { Suspense } from "react"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const fetchData = async (name: string) => {
  await sleep(2000)
  return `${name} is 42 age`
}

let cachedData: string | undefined;

const useData = (name: string) => {
  if (cachedData === undefined) {
    throw fetchData(name).then(d => cachedData = d)
  }

  return cachedData;
}

export const DataLoader = () => {
  // const data = useData('Bob')
  createFirebaseClientApp()

  const q = query(collection(getFirestore(), 'books'))
  const { data: books } = useFirestoreQueryData(["books"], q, { idField: 'id' })

  if (!books) return <div>Old Loading...</div>

  return (
    <Suspense fallback={<div>Suspense Loading...</div>}>
      {books.map((book) => <div key={book.id}>{book.title} ¥{book.price}</div>)}
    </Suspense>)
}
