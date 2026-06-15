import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth";
import type { LoginPayload, AuthResponse, VerifyPayload, SignupPayload } from "../types/auth";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = () => { 
    const navigate = useNavigate();

    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: () => {
            window.location.href = "/"
        },
        onError: (error, variables) => {
            if (error.message === "EMAIL_NOT_VERIFIED") {
                navigate(
                    "/verify", 
                    { state: { 
                        email: variables.email, 
                        redirectTo: "/"
                    }}
                );
                return;
            }
            return;
        }
    });
}

export const useSignup = () => {
    const navigate = useNavigate();
    
    return useMutation<AuthResponse, Error, SignupPayload>({
        mutationFn: (userData) => authService.signup(userData),
        onSuccess: (_, variables) => {
            navigate(
                "/verify", 
                { state: { 
                    email: variables.email,
                    redirectTo: "/login"
                }}
            );
        },
        onError: (error) => {
            console.error("Signup failed: ", error.message);
        }
    });
}

export const useVerify = () => {
    const location = useLocation();
    const redirectTo = location.state?.redirectTo || "/login";
    
    return useMutation<AuthResponse, Error, VerifyPayload>({
        mutationFn: ({email, verificationCode}) => authService.verify(email, verificationCode),
        onSuccess: () => {
            window.location.href = redirectTo;
        },
        onError: (error) => {
            console.error("Verification failed: ", error.message);
        }
    });
}

export const useResendVerification = () => {
    return useMutation<AuthResponse, Error, { email: string }>({
        mutationFn: ({ email }) => authService.resendVerification(email),
        onError: (error) => {
            console.error("Resend verification failed: ", error.message);
        }
    });
}