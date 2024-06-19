import React, { createContext, useState, useCallback, useMemo } from 'react'
import { AuthContextType } from '../types/context.types'
import AuthService from '../api/AuthService'
import { instance } from '../api/ClientService'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(AuthService.getToken())

  const createToken = useCallback(
    (newToken: string) => {
      setToken(newToken)
      return token
    },
    [token],
  )

  const setAuthorizationHeader = () => {
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete instance.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }

  setAuthorizationHeader()

  const contextValue = useMemo(
    () => ({
      token,
      createToken,
    }),
    [token, createToken],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
