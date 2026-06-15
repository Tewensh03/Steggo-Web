const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = async (endPoint: string, options: RequestInit = {}) => {
    const config: RequestInit = {
        credentials: "include",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
    };

    const response = await fetch(`${BASE_URL}/${endPoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.code || errorData.message || "Something went wrong. Please try again later.");
    }

    return response.json();
}