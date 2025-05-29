import { client } from '@/lib/apolo-client'
import { ApolloProvider, useApolloClient } from '@apollo/client'
import React from 'react'

function layout({
  children}:{children: React.ReactNode}) {
  

   return <ApolloProvider client={client}>{children}</ApolloProvider>
   
  
}

export default layout