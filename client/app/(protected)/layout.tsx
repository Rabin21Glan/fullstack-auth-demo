"use client"

import { ApolloProvider, useApolloClient } from '@apollo/client'
import React from 'react'

function layout({
  children}:{children: React.ReactNode}) {
  
  const apoloClient = useApolloClient();
   return <ApolloProvider client={apoloClient}>{children}</ApolloProvider>
   
  
}

export default layout