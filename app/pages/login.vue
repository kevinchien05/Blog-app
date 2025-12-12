<template>
    <NuxtLayout>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow-xl rounded-border w-full lg:w-6/12 mx-auto">
            <div class="flex justify-center">
                <div class="flex flex-col items-center gap-2">
                    <img src="/logo.png" alt="" height="100" width="100">
                    <span class="font-bold text-3xl">Welcome Back</span>
                    <span class="font-semibold">Don't have account ? <NuxtLink :to="{name: 'register'}" class="text-blue-600 dark:text-blue-300">Create Today</NuxtLink></span>
                </div>
            </div>
            <form @submit.prevent="loginUser">
                <div class="flex flex-col mt-6 gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="email" class="font-semibold">Email</label>
                        <InputText id="email" v-model="user.email" placeholder="abcde@gmail.com" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password" class="font-semibold">Password</label>
                        <Password inputId="password" v-model="user.password" class="w-full" toggleMask :feedback="false" />
                    </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <div class="flex items-center gap-2">
                        <Checkbox v-model="user.rememberMe" binary />
                        <span>Remember Me</span>
                    </div>
                    <div>
                        <NuxtLink :to="{name: 'forget'}" class="text-blue-600 dark:text-blue-300">Forget Password?</NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col mt-4 gap-1">
                    <Button label="Sign in" type="submit" />
                    <span class="text-center">or</span>
                    <Button label="Sign in with Google" type="button" severity="contrast" variant="outlined"
                        icon="pi pi-google" iconPos="left" />
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
import type { User } from '~/types/user';

const user = ref<User>({
    username: "",
    email: "",
    password: "",
    rememberMe: true
});

const loginUser = async (): Promise<void> => {
    console.log(user.value);
    navigateTo("/");
}
</script>