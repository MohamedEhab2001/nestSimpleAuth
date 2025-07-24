import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './requests';
import { User } from '../../types/auth';

export const useMe = () => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem('access_token'),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};