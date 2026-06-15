import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useResendVerification, useVerify } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const VerifyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const {
        mutate: Verify, 
        isPending, 
        isError, 
        error: serverError,
        reset,
    } = useVerify();

    const {
        mutate: ResendVerification,
        isPending: isResending,
        isError: isResendError,
        error: resendError,
        reset: resetResend,
    } = useResendVerification();
    
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // If a user inspects or forced-routes to /verify without an email, 
    // redirect them back to the registration page.
    useEffect(() => {
        if (!email) {
            navigate("/signup"); 
        }
    }, [email, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value !== "" && !/^\d+$/.test(value)) return;

        if (value.length > 6) return;

        setVerificationCode(value);

        if (isError) reset();
        if (isResendError) resetResend();
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (verificationCode.length !== 6) {
            setError("The verification code must be exactly 6 digits.");
            return;
        }

        Verify({ email, verificationCode });
    };

    const handleResend = () => {
        if (isError) reset();
        if (error) setError(null);
        setSuccessMessage(null);

        ResendVerification(
            { email },
            {
                onSuccess: () => {
                    setSuccessMessage("A new verification code has been sent!");
                }
            }
        );
    };

    const displayError = error || 
        (isError ? serverError?.message : null) || 
        (isResendError ? resendError?.message : null);

    const isWorking = isPending || isResending;

    return (
        <div className="h-screen w-full bg-primary flex justify-center items-center px-4">
            <div className="w-full max-w-md bg-background-main rounded-xl shadow-xl p-8 transition-all duration-300">
                
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-zinc-900">Verify Your Account</h1>
                    <p className="text-sm text-zinc-500 mt-2">
                        We sent a 6-digit verification code to {email}. Enter it below to activate your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-zinc-700">
                            Verification Code
                        </label>
                        <Input
                            type="text"
                            inputMode="numeric" 
                            pattern="\d*"  
                            placeholder="000000"
                            value={verificationCode}
                            onChange={handleInputChange}
                            disabled={isPending}
                            className="text-center"
                            required
                        />
                    </div>

                    {displayError && (
                        <div className="text-red-600 text-sm font-medium animate-fadeIn text-center">
                            {displayError}
                        </div>
                    )}

                    {successMessage && (
                        <div className="text-emerald-700 text-sm font-medium animate-fadeIn text-center">
                            {successMessage}
                        </div>
                    )}

                    <Button 
                        isLoading={isPending} 
                        loadingText="Verifying..."
                        disabled={isWorking}
                    >
                        Verify Code
                    </Button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-zinc-600">
                        Didn't receive the email?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isWorking}
                            className="font-semibold text-zinc-900 hover:underline cursor-pointer disabled:opacity-50"
                        >
                            {isResending ? "Sending code..." : "Resend Code"}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default VerifyPage;