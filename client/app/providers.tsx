"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloProvider, useApolloClient } from "@apollo/client";
import { client } from "@/lib/apolo-client";
import { AuthProvider } from "@/context/authContext";
import { CookiesProvider } from "react-cookie";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  


  return (
    <CookiesProvider>
     
     
    
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        
         <AuthProvider>
          {children}
          </AuthProvider></NextThemesProvider>
       
    </HeroUIProvider>
 
   
    </CookiesProvider>
      
  );
}
