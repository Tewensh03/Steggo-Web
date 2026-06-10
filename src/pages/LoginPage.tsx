import { useState } from "react";
import { authService } from "../auth/auth";
import Input from "../components/Input";

const LoginPage = () => {
    // Toggle between 'login' and 'register' modes
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    // Password visibility states
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Form State
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    return (
        <div className="h-screen w-full bg-primary flex justify-center items-center px-4">
            <div className="w-full max-w-md bg-background-main rounded-xl shadow-xl p-8 transition-all duration-300">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-zinc-900">
                        {isRegister ? "Create an Account" : "Welcome Back!"}
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {isRegister ? "Sign up to get started" : "Keep learning, keep growing"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Username field (Register Only) */}
                    {isRegister && (
                        <Input
                            label="Username"
                            type="text"
                            name="username"
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    )}

                    {/* Email Field */}
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />

                    {/* Password Field */}
                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        {/* Show Password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700 select-none cursor-pointer"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {/* Conditional Confirm Password field (Register Only) */}
                    {isRegister && (
                        <Input
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    )}

                    {/* Forgot Password */}
                    {!isRegister && (
                        <div className="flex justify-end -mt-2">
                            <button
                                type="button"
                                onClick={() => console.log("Redirect to forgot password")}
                                className="text-xs font-medium text-zinc-600 hover:underline cursor-pointer"
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-md transition-colors duration-200 cursor-pointer"
                    >
                        {isRegister ? "Register" : "Log In"}
                    </button>
                </form>

                {/* Auth Toggle Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-zinc-600">
                        {isRegister ? "Already have an account?" : "Don't have an account yet?"}{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setFormData({ username: "", email: "", password: "", confirmPassword: "" });
                            }}
                            className="font-semibold text-zinc-900 hover:underline cursor-pointer"
                        >
                            {isRegister ? "Log In" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;