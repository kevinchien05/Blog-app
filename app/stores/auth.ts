import { defineStore } from "pinia";
import { createAuthService } from "~/service/AuthService";

export const useUserStore = defineStore('user', {
    state: () => ({
        data: null,
        authenticated: false
    }),
    actions: {
        async fetchUser() {
            try {
                const { $api } = useNuxtApp();
                const authService = createAuthService($api);
                const response = await authService.getCurrentUser();
                if (response.data && response.data !== 'No Session Found') {
                    this.data = response.data;
                    this.authenticated = true;
                }
            } catch (e) {
                console.error("Fetch user failed", e);
            }
        },
        logout() {
            this.$reset();
        },
    },
    persist: true
});