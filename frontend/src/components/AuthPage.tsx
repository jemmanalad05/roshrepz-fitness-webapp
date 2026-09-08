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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errors.password && <p className="text-sm text-red-500">
                    {errors.password.message}
                </p>}

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                    <button
                        type="button"
                        className="text-sm font-medium text-blue-600 transition hover:text-blue-800 hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>


                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-gray-900 py-3 font-semibold text-white transition 
               hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </button>


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