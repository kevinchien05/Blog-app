import { defineStore } from "pinia";
import { createAuthService } from "~/service/AuthService";

export const useUserStore = defineStore('user', {
    state: () => ({
        data: null,
        authenticated: false,
        loaded: false
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
                this.data = null;
                this.authenticated = false;
                console.error("Fetch user failed", e);
            } finally {
                this.loaded = true;
            }
        },
        logout() {
            this.$reset();
        },
    },
    persist: true
});