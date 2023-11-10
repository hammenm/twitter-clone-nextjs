import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { Tweet } from '@/types/Tweet';

type UserWithTweets = {
  handle: string;
  name: string;
  avatar: string;
  tweets: Tweet[];
};

const fetchUser = async (userHandle: string): Promise<UserWithTweets> => {
  const { data } = await axios.get(`/api/users/${userHandle}`);
  return data;
};

export const useUser = (userHandle: string, config = {}) => {
  return useQuery({
    ...config,
    queryKey: ['user', userHandle],
    queryFn: () => fetchUser(userHandle),
  });
};
