import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type SignupFormFields = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupFormFields>();

    const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    const response = await fetch("/users/signup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        navigate("/login");
        reset();
    }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 shadow-2xl"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Start your fitness journey today
                    </p>
                </div>

                {/* First and last name */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <input
                            {...register("firstName", {
                                required: "First name is required.",
                            })}
                            type="text"
                            autoComplete="given-name"
                            placeholder="First name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("lastName", {
                                required: "Last name is required.",
                            })}
                            type="text"
                            autoComplete="family-name"
                            placeholder="Last name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Date of birth */}
                <div>
                    <input
                        {...register("dateOfBirth", {
                            required: "Date of birth is required.",
                        })}
                        type="date"
                        autoComplete="bday"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.dateOfBirth.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        {...register("email", {
                            required: "Email is required.",
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <div className="relative">
                        <input
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must have at least 8 characters.",
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
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

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}

                </div>

                {/* Confirm Password */}
                <div>
                    <div className="relative">
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password.",
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((isVisible) => !isVisible)}
                            aria-label={showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"}
                            title={showConfirmPassword ? "Hide password" : "Show password"}
                            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            {showConfirmPassword ? (
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

                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}

                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 py-3 font-semibold text-white transition hover:bg-gray-700 active:scale-95"
                >
                    Create Account
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignupPage;
