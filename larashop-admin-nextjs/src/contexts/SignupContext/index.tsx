"use client"

import { createContext, useContext, useState } from 'react';

type SignupContextType = {
  email: string
  setEmail: (email: string) => void
}
const SignupContext = createContext<SignupContextType>({
  email: "",
  setEmail: () => { },
})

/**
 * 新規会員登録コンテキストプロバイダー
 */
export const SignupContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {

  const [email, setEmail] = useState<string>("");

  return (
    <SignupContext.Provider
      value={{
        email, setEmail
      }}
    >
      {children}
    </SignupContext.Provider>
  )
}

export const useSignupContext = (): SignupContextType => useContext<SignupContextType>(SignupContext)