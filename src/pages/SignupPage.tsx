import { useState } from "react";
import Input from "../components/Input";
import { useSignup } from "../hooks/useAuth";

const SignupPage = () => {
    const { mutate: signup, isPending, isError, error: serverError, reset } = useSignup();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (isError) {
            reset();
        }
        if (error) {
            setError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        signup({ 
            username: formData.username, 
            email: formData.email, 
            password: formData.password 
        });
    };

    const displayError = error || (isError ? serverError?.message : null);

    return (
        <div className="h-screen w-full bg-primary flex justify-center items-center px-4">
            <div className="w-full max-w-md bg-background-main rounded-xl shadow-xl p-8">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-zinc-900">Create an Account</h1>
                    <p className="text-sm text-zinc-500 mt-1">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={isPending}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isPending}
                        required
                    />

                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isPending}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700 select-none cursor-pointer"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <Input
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={isPending}
                        required
                    />

                    {displayError && (
                        <div className="flex justify-center text-red-600 text-sm font-medium animate-fadeIn">
                            {displayError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-md transition-colors duration-200 cursor-pointer"
                    >
                        {isPending ? "Creating account..." : "Register"}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-zinc-600">
                        Already have an account?{" "}
                        <a href="/login" className="font-semibold text-zinc-900 hover:underline">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;