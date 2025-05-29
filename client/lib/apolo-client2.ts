// lib/apolloClient.ts
import { AuthResponse } from "@/types";
import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  Observable,
  Operation
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN_MUTATION } from "./mutations";

type PendingRequestCallback = (newToken: string) => void;

let isRefreshing = false;
let pendingRequests: PendingRequestCallback[] = [];

export function addPendingRequest(cb: PendingRequestCallback): void {
  pendingRequests.push(cb);
}

export function resolvePendingRequests(newToken: string): void {
  pendingRequests.forEach((callback) => callback(newToken));
  pendingRequests = [];
}



export function createAuthLink(
  getAuth: () => AuthResponse | null,
  setAuth: (auth: AuthResponse | null) => void
) {
  return new ApolloLink((operation: Operation, forward) => {
    const auth = getAuth();
    const token = auth?.accessToken || "";

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }));

    return forward(operation);
  });
}



export function createErrorLink(
  getAuth: () => AuthResponse | null,
  setAuth: (auth: AuthResponse | null) => void,
  client: ApolloClient<any>
) {
  return onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return new Observable<FetchResult>((observer) => {
            const retryRequest = (newToken: string) => {
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}`,
                },
              }));

              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            };

            addPendingRequest(retryRequest);

            if (!isRefreshing) {
              isRefreshing = true;

              const refreshToken = getAuth()?.refreshToken;
              if (!refreshToken) {
                setAuth(null);
                window.location.href = "/login";
                observer.error("No refresh token");
                return;
              }

              client
                .mutate({
                  mutation: REFRESH_TOKEN_MUTATION,
                  variables: { refreshToken },
                })
             .then(({ data }) => {
  const { accessToken, refreshToken } = data.refreshToken;
  const updatedAuth: AuthResponse = {
                         ...getAuth()!,
                       accessToken,
                  refreshToken:refreshToken,
                 };

              setAuth(updatedAuth);
               isRefreshing = false;
              resolvePendingRequests(accessToken); 
           })

                .catch((err) => {
                  console.error("Token refresh failed:", err);
                  isRefreshing = false;
                  pendingRequests = [];
                  setAuth(null);
                  window.location.href = "/login";
                });
            }
          });
        }
      }
    }
  });
}
