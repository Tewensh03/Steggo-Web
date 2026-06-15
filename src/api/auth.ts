import { apiClient } from "./client";
import type { LoginPayload, SignupPayload, AuthResponse } from "../types/auth";

export const authService = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        return apiClient("auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
    signup: async (payload: SignupPayload): Promise<AuthResponse> => {
        return apiClient("auth/signup", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },
    verify: async ( email: string, verificationCode: string): Promise<AuthResponse> => {
        return apiClient("auth/verify", {
            method: "POST",
            body: JSON.stringify({ email, verificationCode })
        });
    },
    resendVerification: async (email: string): Promise<AuthResponse> => {
        return apiClient(`auth/resend?email=${encodeURIComponent(email)}`, {
            method: "POST",
        });
    }
}