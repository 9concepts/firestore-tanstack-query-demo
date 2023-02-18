import { QueryKey, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { DocumentData, FirestoreError, onSnapshot, Query, QuerySnapshot, Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";

export function useFirestoreQuery(
  queryKey: QueryKey,
  query: Query<DocumentData>,
): UseQueryResult<QuerySnapshot<DocumentData>, FirestoreError> {
  const queryClient = useQueryClient();
  let unsubscribe: Unsubscribe = () => {};

  const queryFn = () => {
    return new Promise<QuerySnapshot<DocumentData>>((resolve, reject) => {
      try {
        unsubscribe = onSnapshot(query, (snapshot => {
          queryClient.setQueryData(queryKey, snapshot)
          resolve(snapshot)
        }))
      } catch (error) {
        reject(error)
      }
    })
  }

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      unsubscribe()
    });

    return unsubscribe;
  }, [queryKey, query])

  return useQuery({
    queryKey,
    queryFn,
    retry: false,
    staleTime: Infinity,
    refetchInterval: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
