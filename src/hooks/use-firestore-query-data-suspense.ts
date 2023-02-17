import { QueryKey, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { DocumentData, FirestoreError, onSnapshot, Query, Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";

const unsubscribes: Unsubscribe[] = []

type WithIdField<D, F = void> = F extends string
  ? D & { [key in F]: string }
  : D;
export function useFirestoreQueryDataSuspense<Doc = DocumentData, Result = WithIdField<Doc>[]>(
  queryKey: QueryKey,
  query: Query<Doc>,
): UseQueryResult<Result, FirestoreError>
export function useFirestoreQueryDataSuspense<ID extends string, Doc = DocumentData, Result = WithIdField<Doc, ID>[]>(
  queryKey: QueryKey,
  query: Query<Doc>,
  options: { idField: ID },
): UseQueryResult<Result, FirestoreError>
export function useFirestoreQueryDataSuspense<ID extends string, Doc = DocumentData, Result = WithIdField<Doc, ID>[]>(
  queryKey: QueryKey,
  query: Query<Doc>,
  options?: { idField: ID },
): UseQueryResult<Result, FirestoreError> {
  const queryClient = useQueryClient();

  const queryFn = () => {
    return new Promise<Doc[]>((resolve, reject) => {
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
          queryClient.setQueryData(queryKey, docs)
          resolve(docs)
        }))

        unsubscribes.push(unsubscribe)
      } catch (error) {
        reject(error)
      }
    })
  }

  useEffect(() => {
    window.addEventListener('beforeunload', (_event) => {
      console.log("in beforeunload callback")
      unsubscribes.forEach(unsubscribe => unsubscribe())
    });
  }, [])

  return useQuery({
    queryKey,
    queryFn,
    retry: false,
    staleTime: Infinity,
    refetchInterval: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    suspense: true
  })

  // return d
}
