import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from './Button.jsx';
import Input from "./Input";
import Logo from "./Logo.jsx";
import { login } from '../store/authSlice';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        try {
            // Attempt to create the account
            const createdUser = await authService.createAccount(data);
            if (createdUser) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate("/");
                    toast.success("Account created successfully");
                } else {
                    setError("Failed to retrieve user data after account creation.");
                }
            } else {
                setError("Account creation failed.");
            }
        } catch (error) {
            setError(error.message || "An error occurred during signup.");
            toast.error(error.message || "An error occurred during signup.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg  rounded-lg shadow-lg p-10 border bg-gray-300">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-24">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-semibold text-gray-800">
                    Sign Up
                </h2>
                <p className="mt-2 text-center text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="text-primary font-medium hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-6">
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Full name is required",
                            })}
                            error={errors.name?.message}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Enter a valid email address",
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
                            {...register("password", {
                                required: "Password is required",
                            })}
                            error={errors.password?.message}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;

