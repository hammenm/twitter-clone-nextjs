import { createContext } from 'react';
import { User as UserPrisma } from '@prisma/client';

type User = Omit<UserPrisma, 'password'>;

export type Auth = {
  user: User | null;
  token: string | null;
};

type ContextProps = {
  user: User | null;
  token: string | null;
  setAuth: (auth: Auth) => void;
  isAuthenticated: boolean;
  logout: () => void;
};

export const UserContext = createContext({
  user: null,
  token: null,
  setAuth: () => {},
  isAuthenticated: false,
  logout: () => {},
} as ContextProps);
