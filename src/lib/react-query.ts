import { QueryClient } from 'react-query';

const queryConfig = {};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
