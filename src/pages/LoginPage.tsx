import { useState } from "react";
import Input from "../components/Input";
import { useLogin } from "../hooks/useAuth";
import { Button } from "../components/Button";

const LoginPage = () => {
    const { mutate: login, isPending, isError, error: serverError, reset } = useLogin();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
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
        login({ email: formData.email, password: formData.password });
    };

    const displayError = error || (isError ? serverError?.message : null);

    return (
        <div className="h-screen w-full bg-primary flex justify-center items-center px-4">
            <div className="w-full max-w-md bg-background-main rounded-xl shadow-xl p-8">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-zinc-900">Welcome Back!</h1>
                    <p className="text-sm text-zinc-500 mt-1">Keep learning, keep growing</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isPending}
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
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700 select-none cursor-pointer"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="flex justify-end -mt-2">
                        <button
                            type="button"
                            className="text-xs font-medium text-zinc-600 hover:underline cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {displayError && (
                        <div className="flex justify-center text-red-600 text-sm font-medium animate-fadeIn">
                            {displayError}
                        </div>
                    )}

                    <Button 
                        isLoading={isPending}
                        loadingText="Logging in..."
                        disabled={isPending}
                    >
                        Log In
                    </Button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-zinc-600">
                        Don't have an account yet?{" "}
                        <a href="/signup" className="font-semibold text-zinc-900 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;