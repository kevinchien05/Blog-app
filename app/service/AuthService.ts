import type { AxiosInstance } from "axios";

export const createAuthService = (api: AxiosInstance) => ({
    registerUser(dto: object) {
        return api.post('/auth/register', dto)
    },

    verifyEmail(token: string) {
        return api.get(`/auth/verify-email?token=${token}`)
    },

    loginUser(dto: FormData) {
        return api.post('/auth/login', dto, { withCredentials: true })
    },

    getCurrentUser() {
        return api.get('/auth/user', { withCredentials: true })
    },

    logoutUser() {
        return api.get('/auth/logout', { withCredentials: true });
    }
})