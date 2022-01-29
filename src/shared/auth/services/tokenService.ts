import { ISession } from '../interfaces/ISession';

const SESSION_KEY = 'session';

export async function retrieveStoredTokens(): Promise<ISession | undefined> {
  var sessionStr = sessionStorage.getItem(SESSION_KEY);
  return sessionStr
    ? JSON.parse(atob(sessionStr))
    : undefined;
}

export async function persistTokens(session: ISession): Promise<void> {
  var encoded = btoa(JSON.stringify(session));
  sessionStorage.setItem(SESSION_KEY, encoded);
}

export async function clearTokens(): Promise<void> {
  sessionStorage.removeItem(SESSION_KEY);
}
