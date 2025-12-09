<template>
    <NuxtLayout>
        <div class="bg-surface-0 dark:bg-surface-900 rounded-border shadow-xl w-11/12 lg:w-6/12 mx-auto p-6">
            <div class="flex justify-center">
                <div class="flex flex-col items-center gap-2">
                    <img src="/logo.png" alt="" height="100" width="100">
                    <span class="font-bold text-3xl">Forget Password</span>
                    <span class="font-semibold">Enter your email to reset password</span>
                </div>
            </div>
            <form @submit.prevent="">
                <div class="flex flex-col mt-6 gap-3">
                    <div class="flex flex-col gap-1">
                        <label for="email" class="font-semibold">Email</label>
                        <InputText id="email" v-model="user.email" placeholder="abcde@gmail.com" class="w-full" />
                    </div>
                </div>
                <div class="flex mt-6 gap-2">
                    <Button label="Cancel" variant="outlined" severity="danger" type="button" class="w-full"
                        @click="goBack" />
                    <Button label="Submit" type="button" class="w-full" @click="goChange" />
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
    password: ""
})

const goBack = (): void => {
    navigateTo({ name: "login" });
}

const goChange = (): void => {
    navigateTo({ name: 'change-password', query: { email: user.value.email } });
}
</script>