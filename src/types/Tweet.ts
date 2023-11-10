export type Tweet = {
  id: number;
  text: string;
  author: {
    handle: string;
    name: string;
    avatar: string;
  };
  authorHandle: string;
  likes: {
    id: number;
    userHandle: string;
  }[];
  parentTweet: Tweet | null;
  parentTweetId: number | null;
  comments: Tweet[];
  timestamp: Date;
};
