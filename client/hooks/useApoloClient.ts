import AuthContext from "@/context/authContext";
import { httpLink } from "@/lib/apolo-client";
import { createAuthLink, createErrorLink } from "@/lib/apolo-client2";
import {
  ApolloClient,
  from,
  InMemoryCache,
} from "@apollo/client";
import { useContext, useMemo, useRef } from "react";

export function useApolloClient() {
  const { auth, setAuth } = useContext(AuthContext);

  const clientRef = useRef<ApolloClient<any> | null>(null);

  // Step 1: Auth link
  const authLink = useMemo(() => createAuthLink(() => auth, setAuth), [auth, setAuth]);

  // Step 2: Create client without errorLink first (for token refresh call inside errorLink)
  if (!clientRef.current) {
    clientRef.current = new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }

  // Step 3: Now create errorLink with the client
  const errorLink = useMemo(
    () => createErrorLink(() => auth, setAuth, clientRef.current!),
    [auth, setAuth]
  );

  // Step 4: Final client with errorLink prepended
  const finalClient = useMemo(
    () =>
      new ApolloClient({
        link: from([errorLink, authLink, httpLink]),
        cache: new InMemoryCache(),
      }),
    [errorLink, authLink]
  );

  return finalClient;
}
