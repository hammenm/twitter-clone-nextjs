import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { axios } from '@/lib/axios';
import { Auth } from '@/context/UserContext';

type LoginBody = {
  handle: string;
  password: string;
};

const fetchLogin = async (body: LoginBody): Promise<Auth> => {
  const { data } = await axios.post('/api/auth/login', body);
  return data;
};

export const useLoginMutation = (config = {}) => {
  return useMutation<Auth, AxiosError, LoginBody>(fetchLogin, config);
};
