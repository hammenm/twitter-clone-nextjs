import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { Tweet } from '@/types/Tweet';

const fetchFeed = async (): Promise<Tweet[]> => {
  const { data } = await axios.get('/api/feed');
  return data;
};

export const useFeed = () => {
  return useQuery({
    queryKey: 'feed',
    queryFn: fetchFeed,
  });
};
