import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import Button from './Button.jsx';
import Input from './Input';
import Logo from './Logo';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        toast.success('Welcome Back');
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="w-full max-w-lg rounded-lg bg-grey shadow-lg p-8 border border-black-200 bg-gray-300">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-24">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-3xl font-semibold text-gray-800">
          Sign In to Your Account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <div>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Enter a valid email address',
                },
              })}
              error={errors.email?.message}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              error={errors.password?.message}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
