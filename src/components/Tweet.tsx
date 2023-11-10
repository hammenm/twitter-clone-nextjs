import { useContext, useState } from 'react';
import Link from 'next/link';
import { Tweet } from '@/types/Tweet';
import { UserContext } from '@/context/UserContext';
import { useLikeMutation } from '@/features/api/useLikeMutation';
import { useUnlikeMutation } from '@/features/api/useUnlikeMutation';
import { useReplyMutation } from '@/features/api/useReplyMutation';

type SectionLikesProps = {
  likes: Tweet['likes'];
  tweetId: Tweet['id'];
};

function SectionLikes({ likes, tweetId }: SectionLikesProps) {
  const { user } = useContext(UserContext);
  const isLiked = likes.some(
    (like: { userHandle: string }) => like.userHandle === user?.handle,
  );
  const mutationLike = useLikeMutation();
  const mutationUnlike = useUnlikeMutation();

  const handleLike = () => {
    if (!user) return;

    if (isLiked) {
      mutationUnlike.mutate({ tweetId });
    } else {
      mutationLike.mutate({ tweetId });
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-1">
      <button onClick={handleLike}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isLiked ? 'red' : 'none'}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      <span>{likes.length}</span>
    </div>
  );
}

type TweetSingleProps = {
  tweet: Tweet;
  size: 'small' | 'normal';
};

function TweetSingle({ tweet, size }: TweetSingleProps) {
  const classNameRoot = size === 'small' ? 'ml-12' : '';
  const classNameImg = size === 'small' ? 'w-8 h-8' : 'w-12 h-12';

  return (
    <div className={`${classNameRoot} mb-4`}>
      <div className="flex items-center space-x-4">
        <img
          src={tweet.author.avatar}
          alt={tweet.author.name}
          className={`${classNameImg} rounded-full`}
        />
        <div className="flex flex-col">
          <Link href={`/users/${tweet.author.handle}`}>
            <span className="font-bold">{tweet.author.name}</span>
          </Link>
          <span className="text-gray-500">
            {new Date(tweet.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
      <p className="text-lg mt-1">{tweet.text}</p>
      <SectionLikes likes={tweet.likes} tweetId={tweet.id} />
    </div>
  );
}

type TweetProps = {
  tweet: Tweet;
};

export default function Tweet({ tweet }: TweetProps) {
  const [reply, setReply] = useState<string>('');
  const { isAuthenticated } = useContext(UserContext);

  const mutation = useReplyMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reply) return;

    mutation.mutate(
      { text: reply, tweetId: tweet.id },
      {
        onSuccess: () => {
          setReply('');
        },
      },
    );
  };

  return (
    <div className="border-b border-gray-300 p-4">
      <TweetSingle tweet={tweet} size="normal" />
      {tweet.comments.length > 0 &&
        tweet.comments.map((comment) => (
          <TweetSingle tweet={comment} size="small" key={comment.id} />
        ))}
      {isAuthenticated && (
        <div className="ml-12 mt-4">
          <form className="flex space-x-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded-lg flex-1 text-black"
              placeholder="Reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
