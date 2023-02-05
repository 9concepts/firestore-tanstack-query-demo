import { collection, getFirestore, query } from "firebase/firestore"
import { NextPage } from "next"
import { useCollectionData } from 'react-firebase-hooks/firestore'

const BooksPage: NextPage = () => {
  const q = query(collection(getFirestore(), 'books'))
  const [books, loading, error] = useCollectionData(q)

  if (!books || loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (<ul>
    {books && books.map(book => <li key={book.id}>{book.title}</li>)}
  </ul>)
}

export default BooksPage
