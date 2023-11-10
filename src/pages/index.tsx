import { useContext, useState } from 'react';
import { useFeed } from '@/features/api/useFeed';
import Tweet from '@/components/Tweet';
import { useNewTweetMutation } from '@/features/api/useNewTweetMutation';
import { UserContext } from '@/context/UserContext';

export default function Home() {
  const { isAuthenticated } = useContext(UserContext);
  const [text, setText] = useState<string>('');
  const { data, isLoading } = useFeed();
  const mutation = useNewTweetMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text) return;
    if (mutation.isLoading) return;

    mutation.mutate(
      { text },
      {
        onSuccess: () => {
          setText('');
        },
      },
    );
  };

  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        {/* Input to write a new tweet */}
        {isAuthenticated && (
          <div className="p-4">
            <form className="flex space-x-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg flex-1 text-black"
                placeholder="What's happening?"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
              >
                Tweet
              </button>
            </form>
          </div>
        )}
        {isLoading && <div>Loading...</div>}
        {data?.map((tweet) => <Tweet tweet={tweet} key={tweet.id} />)}
      </div>
    </main>
  );
}
