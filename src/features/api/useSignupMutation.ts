import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { axios } from '@/lib/axios';
import { Auth } from '@/context/UserContext';

type SignupBody = {
  name: string;
  handle: string;
  password: string;
};

const fetchSignup = async (body: SignupBody): Promise<Auth> => {
  const { data } = await axios.post('/api/auth/signup', body);
  return data;
};

export const useSignupMutation = (config = {}) => {
  return useMutation<Auth, AxiosError, SignupBody>(fetchSignup, config);
};
