export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload extends LoginPayload {
    username: string;
}

export interface VerifyPayload {
    email: string;
    verificationCode: string;
}

export interface AuthResponse {
    message: string;
}