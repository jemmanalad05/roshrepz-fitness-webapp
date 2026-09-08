import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import { Link } from "react-router-dom";

type FormFields = {
    email: string;
    password: string;
}

function AuthPage() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        setIsLoading(true);

        console.log(data);

        // API request would go here

        setIsLoading(false);
        reset();
    };

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 shadow-2xl"
                onSubmit={handleSubmit(onSubmit)}>

                <div className="text-center">
                    <h1 id="header  " className="text-3xl font-bold text-gray-800">
                        Welcome Back to RoshRepz Fitness
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to continue your fitness journey
                    </p>
                </div>

                <input
                    {...register("email", {
                        required: "Email is required.",
                        validate: (value) => {
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                                return "Please enter a valid email address.";
                            }

                            return true;
                        }
                    })}
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.email && <p className="text-sm text-red-500">
                    {errors.email.message}
                </p>}

                <div className="relative">
                    <input
                        {...register("password", {
                            required: "Password is required.",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters.",
                            },
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((isVisible) => !isVisible)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        {showPassword ? (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.8 10.8 0 0112 4c5.5 0 9.3 4.4 10 8-0.3 1.5-1.1 3-2.3 4.2M6.2 6.2C4.5 7.7 3.4 9.7 3 12c0.7 3.6 4.5 8 9 8 1.1 0 2.1-0.2 3-0.6" />
                            </svg>
                        ) : (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">
                    {errors.password.message}
                </p>}


                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-gray-900 py-3 font-semibold text-white transition 
               hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>


                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}

                    <Link
                        to="/signup"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default AuthPage;
