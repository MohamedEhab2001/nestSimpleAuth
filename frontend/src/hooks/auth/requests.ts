import { apiClient } from '../../api';
import { SignupRequest, SigninRequest, AuthResponse } from '../../types/auth';

export const signupUser = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/signup', data);
  return response.data;
};

export const signinUser = async (data: SigninRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/signin', data);
  return response.data;
};