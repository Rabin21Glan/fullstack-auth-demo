# fullstack-auth-demo
Token Synchronization: Client App
   |
   |   [1] Operation initiated (query/mutation)
   ▼
errorLink (onError)
   |
   |   [2] Forwards the request down the chain
   ▼
authLink
   |
   |   [3] Adds Authorization Header (access token)
   ▼
httpLink
   |
   |   [4] Sends HTTP request to GraphQL server
   ▼
GraphQL Server
   |
   |   [5] Processes the request
   ▼
HTTP Response (data or error)
   ▲
   |   [6] Response sent back up the chain
httpLink
   ▲
   |   [7] Nothing to do — just passes it along
authLink
   ▲
   |   [8] Still nothing — passes along
errorLink (onError)
   ▲
   |   [9] Catches any `graphQLErrors` or `networkError`
   |         ↳ If `UNAUTHENTICATED`, triggers refresh flow
   |         ↳ Retries the request after refreshing token
   ▲
Client App gets final data or error
