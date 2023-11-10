import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '@/lib/axios';
import { UserContext } from '@/context/UserContext';

type Config = {
  onSuccess?: (data: any, variables: any, context: any) => void;
};

export const useLikeMutation = (config: Config = {}) => {
  const { token } = useContext(UserContext);
  const queryClient = useQueryClient();

  return useMutation(
    (body: { tweetId: number }) => {
      return axios.post(
        `/api/tweets/${body.tweetId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    {
      ...config,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries('feed');
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'user',
        });
        config.onSuccess && config.onSuccess(data, variables, context);
      },
    },
  );
};
