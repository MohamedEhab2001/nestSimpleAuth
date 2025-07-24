import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, User, Lock } from 'lucide-react';
import { useSignup } from '../hooks/auth/hook';
import { SignupRequest } from '../types/auth';
import { emailValidation, signupPasswordValidation, nameValidation } from '../utils/Validations';
import Input from '../components/Input';

const Signup: React.FC = () => {
  const signupMutation = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupRequest>();

  const onSubmit = (data: SignupRequest) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            register={register('email', emailValidation)}
            error={errors.email}
          />

          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            icon={User}
            register={register('name', nameValidation)}
            error={errors.name}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Create a password"
            icon={Lock}
            register={register('password', signupPasswordValidation)}
            error={errors.password}
            showPasswordToggle
          />

          <button
            type="submit"
            disabled={isSubmitting || signupMutation.isPending}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting || signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;