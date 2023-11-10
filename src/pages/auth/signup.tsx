import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSignupMutation } from '@/features/api/useSignupMutation';

export default function SignupPage() {
  const [handle, setHandle] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const mutation = useSignupMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!handle || !name || !password) return;
    if (mutation.isLoading) return;

    mutation.mutate(
      { handle, name, password },
      {
        onSuccess: () => {
          router.push('/');
        },
      },
    );
  };

  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex flex-1 overflow-y-auto">
        <div className="flex-1" />
        <div className="items-center justify-center w-1/2 p-4 m-auto">
          <div className="w-full space-y-4 p-4 rounded-lg bg-gray-500">
            <h1 className="text-2xl font-bold">Signup</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                disabled={mutation.isLoading}
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 p-2 rounded-lg text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="handle">Handle</label>
              <input
                disabled={mutation.isLoading}
                type="text"
                id="handle"
                name="handle"
                className="border border-gray-300 p-2 rounded-lg text-black"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                disabled={mutation.isLoading}
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 p-2 rounded-lg text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mutation.isError && (
                <div className="bg-red-500 text-white p-4">
                  {mutation.error?.message}
                </div>
              )}
              <button
                disabled={mutation.isLoading}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
              >
                Sign up
              </button>
            </form>
            <Link href="/auth/login">
              <span className="hover:underline">Already have an account?</span>
            </Link>
          </div>
        </div>
        <div className="flex-1" />
      </div>
    </main>
  );
}
