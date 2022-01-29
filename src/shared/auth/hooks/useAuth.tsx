import React, { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { deleteGlobalHeader, setGlobalHeader } from '../../api/services/httpClient';
import { createSuspenser } from '../../core/lazy';
import { IAuthContext } from '../interfaces/IAuthContext';
import { ISession } from '../interfaces/ISession';
import { IUser } from '../interfaces/IUser';
import { clearTokens, persistTokens, retrieveStoredTokens } from '../services/tokenService';

const storedTokens = createSuspenser(retrieveStoredTokens());

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: React.FC = ({ children }) => {
  // const config = useConfigKey<IAuthConfig>('sso')!;
  const [user, setUser] = useState<IUser | undefined>();
  // const [session, setSession] = useState<ISession | undefined>();
  const session = storedTokens.read();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | undefined>();

  // Implementa API do Error Boundery. Se houver algum erro de Autenticação, ou erro ao
  // atualizar a sessão, suspende o componente em estado de erro.
  if (error) throw error;
  
  const login: () => void = useCallback(() => {}, []);
  const refresh: () => void = useCallback(() => {}, []);
  const clear: () => void = useCallback(() => clearTokens(), []);

  const logout: (redirectUri?: string) => void = useCallback(() => clearTokens(), []);

  useSessionCleanup(session);
  useUserCleanup(session, setUser);
  useApiAuthorizationHeader(session);

  return (
    <AuthContext.Provider value={{ user, session, login, logout, refresh, clear }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

// Setup Api Authorization Header
function useApiAuthorizationHeader(session?: ISession) {
  useEffect(() => {
    if (!!session) {
      setGlobalHeader('Authorization', `Bearer ${session.accessToken}`);
    } else {
      deleteGlobalHeader('Authorization');
    }
  }, [session]);
}

function useSessionCleanup(session?: ISession) {
  useEffect(() => {
    if (session) {
      persistTokens(session);
    } else {
      clearTokens();
    }
  }, [session]);
}

function useUserCleanup(session: ISession | undefined, setUser: Dispatch<SetStateAction<IUser | undefined>>) {
  useEffect(() => {
    if (!session) {
      setUser(undefined);
    }
  }, [session, setUser])
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('AuthProvider context is undefined, please verify you are calling useAuth() as child of a <AuthProvider> component.');

  return context;
}
