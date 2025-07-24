import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupUser, signinUser } from './requests';
import { SignupRequest, SigninRequest, AuthResponse } from '../../types/auth';
import { ErrorDisplay } from '../../utils/Helpers';

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SignupRequest>({
    mutationFn: signupUser,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      queryClient.setQueryData(['user'], data.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      ErrorDisplay(error, toast);
    },
  });
};

export const useSignin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, SigninRequest>({
    mutationFn: signinUser,
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      queryClient.setQueryData(['user'], data.user);
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      ErrorDisplay(error, toast);
    },
  });
};

export const useSignout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signOut = () => {
    localStorage.removeItem('access_token');
    queryClient.clear();
    toast.info('Signed out successfully!');
    navigate('/signin');
  }
  return signOut;
};