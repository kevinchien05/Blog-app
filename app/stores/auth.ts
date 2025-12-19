import { defineStore } from "pinia";
import { createAuthService } from "~/service/AuthService";
import type { User } from "~/types/user";

export const useUserStore = defineStore('user', {
    state: ():{
        data: User | null,
        authenticated: boolean,
        loaded: boolean
    } => ({
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