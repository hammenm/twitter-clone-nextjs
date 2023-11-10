import '@/styles/globals.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/lib/react-query';
import { Auth, UserContext } from '@/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    token: null,
  });
  const isAuthenticated = !!auth.user;

  return (
    <UserContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        setAuth: (auth: Auth) => {
          setAuth(auth);
        },
        isAuthenticated,
        logout: () => {
          setAuth({ user: null, token: null });
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <header className="flex bg-gray-800 dark:bg-gray-900 text-white p-4 shadow-md">
          <Link href="/">
            <h1 className="text-2xl font-bold">Real Twitter</h1>
          </Link>
          {/* Spacer then login and signup buttons */}
          <div className="flex-1" />
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                onClick={() => {
                  setAuth({ user: null, token: null });
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </header>
        <main className="flex flex-col w-full h-[calc(100vh-4.5rem)] bg-gray-50 dark:bg-gray-800 dark:text-white">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}
