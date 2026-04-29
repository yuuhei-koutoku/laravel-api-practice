"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import getMe from '@/services/auth/getMe';
import signin from '@/services/auth/signin';
import signout from '@/services/auth/signout';
import type { AccessToken, AdminUser } from '@/types/responseType'
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/types/localStorageKeys';

type AuthContextType = {
  authUser: AdminUser | null
  isLoaded: boolean
  attempt: (email: string, password: string) => Promise<AccessToken | null>
  signin: (accessToken: AccessToken) => void
  signout: () => Promise<void>
  setAuthUser: (user: AdminUser | null) => void
}
const AuthContext = createContext<AuthContextType>({
  authUser: null,
  isLoaded: false,
  attempt: async () => Promise.resolve(null),
  signin: () => {},
  signout: async () => Promise.resolve(),
  setAuthUser: async () => Promise.resolve(),
})

/**
 * 認証コンテキストプロバイダー
 */
export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {

  const [authUser, setAuthUser] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {

    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

    if (accessToken !== null) {
      (async () => {
        setIsLoaded(false)

        let user
        try {
          user = await getMe()
        } catch (error) {
          localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        }

        if (user) {
          setAuthUser(user)
        }

        setIsLoaded(true)
      })();
    } else {
      setIsLoaded(true)
    }
  }, [])

  const attempt = async (email: string, password: string): Promise<AccessToken | null> => {
    const accessToken: AccessToken = await signin({ email, password })
    return accessToken
  };

  const signinInternal = (accessToken: AccessToken) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken.accessToken); 
    setAuthUser(accessToken.adminUser)
  };

  const signoutInternal = async () => {
    await signout()
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY); 
    setAuthUser(null)
  };

  return (
    <AuthContext.Provider
      value={{
        authUser, isLoaded, attempt, signin: signinInternal, signout: signoutInternal, setAuthUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextType => useContext<AuthContextType>(AuthContext)
