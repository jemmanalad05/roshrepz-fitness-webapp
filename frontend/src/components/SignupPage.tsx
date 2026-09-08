import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type SignupFormFields = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function SignupPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupFormFields>();

    const onSubmit: SubmitHandler<SignupFormFields> = (data) => {
        console.log(data);

        reset();
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
                    <input
                        {...register("password", {
                            required: "Password is required.",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must have at least 8 characters.",
                            },
                        })}
                        type="password"
                        placeholder="Create a password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <input
                        {...register("confirmPassword", {
                            required: "Please confirm your password.",
                        })}
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

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
