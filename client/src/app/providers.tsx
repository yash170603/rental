"use client"

import StoreProvider from "@/state/redux"
import { Authenticator } from "@aws-amplify/ui-react"
import Auth from "./(auth)/authProvider"
import ThemeProvider from "./ThemeProvider"

const Providers = ({children}:{children:React.ReactNode}) => {
  return (
    <ThemeProvider>
      <StoreProvider>
      <Authenticator.Provider>
       <Auth>
       {children}
       </Auth>
      </Authenticator.Provider>
    
    </StoreProvider>
       </ThemeProvider>
    
  )
}

export default Providers