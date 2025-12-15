import type { AxiosInstance } from "axios";

export const createAuthService = (api: AxiosInstance) => ({
    registerUser(dto: object) {
        return api.post('/auth/register', dto)
    },

    verifyEmail(token: string) {
        return api.get(`/auth/verify-email?token=${token}`)
    }

})