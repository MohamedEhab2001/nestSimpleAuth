import { apiClient } from '../../api';
import { User } from '../../types/auth';

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/user/me');
  return response.data;
};