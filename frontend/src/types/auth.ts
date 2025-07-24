export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ApiError {
  message: string;
  status?: number;
}