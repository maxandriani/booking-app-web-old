import { ISession } from './ISession';
import { IUser } from './IUser';

export interface IAuthContext {
  user: IUser | undefined;
  session: ISession | undefined;

  login(): void;
  logout(): void;
  refresh(): void;
  clear(): void;
}
