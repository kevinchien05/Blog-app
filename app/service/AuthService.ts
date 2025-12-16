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

    getEmail(email: string) {
        return api.get(`/auth/email?email=${email}`)
    },

    resetToken(email: string, token: string) {
        return api.get(`/auth/email/verification?email=${email}&token=${token}`);
    },

    changePass(email: string, password: string) {
        return api.put(`/auth/change/pass?email=${email}&password=${password}`);
    },

    logoutUser() {
        return api.get('/auth/logout', { withCredentials: true });
    }
})