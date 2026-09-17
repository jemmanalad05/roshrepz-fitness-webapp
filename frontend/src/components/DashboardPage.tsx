import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
    async function loadUser() {
        const token = sessionStorage.getItem("token");

        if (!token) {
        navigate("/login");
        return;
        }

        const response = await fetch("/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const result = await response.json();

        if (!response.ok) {
        sessionStorage.removeItem("token");
        navigate("/login");
        return;
        }

        setUser(result.user);
    }

    loadUser().catch(() => {
        setError("Could not load your dashboard.");
    });
    }, [navigate]);

    if (error) {
    return <p className="p-8 text-red-500">{error}</p>;
    }

    if (!user) {
    return <p className="p-8 text-white">Loading dashboard...</p>;
    }

    return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
        <h2 className="text-3xl font-bold text-white">
        Welcome, {user.first_name}!
        </h2>

        <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
        >Logout
        </button>

        <p className="mt-2 text-gray-200">
        Track your workouts and fitness goals.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Workouts this week</h3>
            <p className="mt-3 text-3xl font-bold">0</p>
        </article>

        <article className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Active goals</h3>
            <p className="mt-3 text-3xl font-bold">0</p>
        </article>

        <article className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Current streak</h3>
            <p className="mt-3 text-3xl font-bold">0 days</p>
        </article>
        </section>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-lg">
        <h3 className="text-xl font-semibold">Get started</h3>
        <Link
            to="/workouts"
            className="mt-4 inline-block rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white"
        >
            Create a workout
        </Link>
        </section>
    </main>
    );
    }

    export default DashboardPage;