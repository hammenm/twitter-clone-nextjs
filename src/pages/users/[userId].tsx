import { useRouter } from 'next/router';
import Tweet from '@/components/Tweet';
import { useUser } from '@/features/api/useUser';
import { useEffect } from 'react';

export default function UserPage() {
  const router = useRouter();
  const { userId: userHandle } = router.query;
  const { data, isLoading, refetch, isPreviousData } = useUser(
    userHandle as string,
    {
      enabled: !!userHandle,
    },
  );

  useEffect(() => {
    if (router.isReady && !isPreviousData) {
      refetch();
    }
  }, [router.isReady, refetch]);

  return (
    <main className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto">
        {isLoading && <div>Loading...</div>}
        {/* Card with the user information */}
        <div className="flex items-center justify-center w-1/2 p-4 m-auto">
          <div className="flex items-center w-full space-x-4 p-4 rounded-lg bg-gray-500">
            <img
              src={data?.avatar}
              alt={data?.name}
              className="w-24 h-24 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold">{data?.name}</span>
              <span>@{data?.handle}</span>
            </div>
          </div>
        </div>
        {/* List of tweets */}
        {data?.tweets.map((tweet) => <Tweet tweet={tweet} key={tweet.id} />)}
      </div>
    </main>
  );
}
