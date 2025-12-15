<template>
    <NuxtLayout>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow-xl rounded-border w-full lg:w-6/12 mx-auto">
            <div class="flex justify-center">
                <div class="flex flex-col items-center gap-2">
                    <img src="/logo.png" alt="" height="100" width="100">
                    <span class="font-bold text-3xl">Welcome Back</span>
                    <span class="font-semibold">Don't have account ? <NuxtLink :to="{ name: 'register' }"
                            class="text-blue-600 dark:text-blue-300">Create Today</NuxtLink></span>
                </div>
            </div>
            <form @submit.prevent="loginUser">
                <div v-if="status.show"
                    :class="status.success ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'"
                    class="border px-4 py-3 rounded relative mb-2" role="alert">
                    <span class="block sm:inline">{{ status.msg }}</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="closeStatus">
                        <svg class="fill-current h-6 w-6" :class="status.success ? 'text-green-500' : 'text-red-500'"
                            role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path
                                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                    </span>
                </div>
                <div class="flex flex-col mt-6 gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="email" class="font-semibold">Email</label>
                        <InputText id="email" :invalid="submitted && !user.email" v-model="user.email" placeholder="abcde@gmail.com" class="w-full" />
                        <span v-if="submitted && !user.email" class="text-xs text-red-600 mt-1">Email is empty!</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password" class="font-semibold">Password</label>
                        <Password inputId="password" :invalid="submitted && !user.password" v-model="user.password" class="w-full" toggleMask
                            :feedback="false" />
                        <span v-if="submitted && !user.password" class="text-xs text-red-600 mt-1">Password is empty!</span>
                    </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <div class="flex items-center gap-2">
                        <Checkbox v-model="user.rememberMe" binary />
                        <span>Remember Me</span>
                    </div>
                    <div>
                        <NuxtLink :to="{ name: 'forget' }" class="text-blue-600 dark:text-blue-300">Forget Password?
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col mt-4 gap-1">
                    <Button label="Sign in" type="submit" :disabled="loading">
                        <template v-if="loading">
                            <span><i class="pi pi-spin pi-spinner"></i> Signing in....</span>
                        </template>
                    </Button>
                    <!-- <span class="text-center">or</span>
                    <Button label="Sign in with Google" type="button" severity="contrast" variant="outlined"
                        icon="pi pi-google" iconPos="left" /> -->
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { createAuthService } from '~/service/AuthService';
import type { Status } from '~/types/status';
import type { User } from '~/types/user';

const { $api } = useNuxtApp();
const authService = createAuthService($api);
const userStore = useUserStore();

const user = ref<User>({
    username: "",
    email: "",
    password: "",
    rememberMe: true
});

const submitted = ref<boolean>(false);
const loading = ref<boolean>(false);

const status = ref<Status>({
    show: false,
    success: true,
    msg: ""
});

const closeStatus = (): void => {
    status.value.show = false;
}

const loginUser = async (): Promise<void> => {
    submitted.value = true;
    if (user.value.email != "" && user.value.password != "") {
        try {
            loading.value = true;
            const form = new FormData();
            form.append("username", user.value.email);
            form.append("password", user.value.password);
            form.append("rememberMe", user.value.rememberMe ? 'true' : 'false');
            await authService.loginUser(form).then(async () => {
                await userStore.fetchUser();
                navigateTo({ name: 'index' });
            })
        } catch (error) {
            status.value.show = true;
            status.value.success = false;
            status.value.msg = "Invalid Credential! Please Try Again"
        } finally {
            loading.value = false;
        }
    }
}
</script>