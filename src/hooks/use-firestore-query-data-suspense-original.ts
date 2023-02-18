import { QueryKey, UseQueryResult } from "@tanstack/react-query";
import { DocumentData, FirestoreError, onSnapshot, Query, Unsubscribe } from "firebase/firestore";
import { cache, useEffect } from "react";

const unsubscribes: Unsubscribe[] = []

let cached: WithIdField<DocumentData>[] | undefined;

type WithIdField<D, F = void> = F extends string
  ? D & { [key in F]: string }
  : D;
function _useFirestoreQueryDataSuspenseOriginal<Doc = DocumentData, Result = WithIdField<Doc>[]>(
  queryKey: QueryKey,
  query: Query<Doc>,
): UseQueryResult<Result, FirestoreError>
function _useFirestoreQueryDataSuspenseOriginal<ID extends string, Doc = DocumentData, Result = WithIdField<Doc, ID>[]>(
  queryKey: QueryKey,
  query: Query<Doc>,
  options: { idField: ID },
): UseQueryResult<Result, FirestoreError>
function _useFirestoreQueryDataSuspenseOriginal<ID extends string, Doc = DocumentData, Result = WithIdField<Doc, ID>[]>(
  queryKey: QueryKey,
  query: Query<Doc>,
  options?: { idField: ID },
): UseQueryResult<Result, FirestoreError> {
  useEffect(() => {
    window.addEventListener('beforeunload', (_event) => {
      console.log("in beforeunload callback")
      unsubscribes.forEach(unsubscribe => unsubscribe())
    });
  }, [])
  if (cached) return { data: cached } as UseQueryResult<Result, FirestoreError>

  throw new Promise<Doc[]>((resolve, reject) => {

    try {
      const unsubscribe = onSnapshot(query, (snapshot => {
        const docs = snapshot.docs.map(doc => {
          let data = doc.data()
          if (options?.idField) {
            data = {
              ...data,
              [options.idField as ID]: doc.id
            }
          }

          return data as WithIdField<Doc, ID>
        })

        console.log("in onSnapshot callback")
        cached = docs
        resolve(docs)
      }))

      unsubscribes.push(unsubscribe)
    } catch (error) {
      reject(error)
    }
  })
}

export const useFirestoreQueryDataSuspenseOriginal = _useFirestoreQueryDataSuspenseOriginal
