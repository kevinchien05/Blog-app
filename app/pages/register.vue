<template>
    <NuxtLayout>
        <div class="bg-surface-0 dark:bg-surface-900 rounded-border shadow-xl w-11/12 lg:w-6/12 mx-auto p-6">
            <div class="flex justify-center">
                <div class="flex flex-col items-center gap-2">
                    <img src="/logo.png" alt="" height="100" width="100">
                    <span class="font-bold text-3xl">Sign Up</span>
                    <span class="font-semibold">Enter your details to create new account</span>
                </div>
            </div>
            <form @submit.prevent="loginUser">
                <div class="flex flex-col mt-6 gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="username" class="font-semibold">Username</label>
                        <InputText id="username" v-model="user.username" placeholder="abcde" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="email" class="font-semibold">Email</label>
                        <InputText id="email" v-model="user.email" placeholder="abcde@gmail.com" class="w-full" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="password" class="font-semibold">Password</label>
                        <Password inputId="password" v-model="user.password" class="w-full" toggleMask
                            :feedback="false" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="passwordConfirmation" class="font-semibold">Confirm Password</label>
                        <Password inputId="passwordConfirmation" v-model="user.password" class="w-full" toggleMask
                            :feedback="false" />
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-4">
                    <Checkbox v-model="user.rememberMe" binary />
                    <span class="font-semibold">I have read the <span class="text-blue-600 dark:text-blue-300">Term and Condition</span></span>
                </div>
                <div class="flex flex-col mt-4 gap-2">
                    <Button label="Create Free Account" type="submit" />
                    <span class="font-semibold text-center">Already have an account? <NuxtLink :to="{name:'login'}" class="text-blue-600 dark:text-blue-300">Sign in</NuxtLink></span>
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
    rememberMe: true,
    confirmPassword: "",
});

const loginUser = async (): Promise<void> => {
    console.log(user.value);
}
</script>