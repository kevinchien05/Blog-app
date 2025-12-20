<template>
    <div class="bg-surface-0 dark:bg-surface-900 rounded-border shadow-xl w-11/12 lg:w-6/12 mx-auto p-6">
        <div class="flex justify-center">
            <div class="flex flex-col items-center gap-2">
                <img src="/logo.png" alt="" height="100" width="100">
                <span class="font-bold text-3xl">Forget Password</span>
                <span class="font-semibold">Enter your email to reset password</span>
            </div>
        </div>
        <form @submit.prevent="">
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
                    <InputText id="email" :invalid="submitted && !user.email && !status.success" v-model="user.email"
                        placeholder="abcde@gmail.com" class="w-full" />
                    <span class="text-xs text-red-600" v-if="submitted && !user.email && !status.success">Email is
                        empty!</span>
                </div>
            </div>
            <div class="flex mt-6 gap-2">
                <Button label="Cancel" variant="outlined" severity="danger" type="button" class="w-full"
                    @click="goBack" />
                <Button label="Submit" type="button" class="w-full" @click="submitCheck">
                    <template v-if="loading">
                        <span><i class="pi pi-spin pi-spinner"></i> Submitting...</span>
                    </template>
                </Button>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { createAuthService } from '~/service/AuthService';
import type { Status } from '~/types/status';
import type { User } from '~/types/user';
import AES from 'crypto-js/aes';

const { $api } = useNuxtApp();
const authService = createAuthService($api);

const user = ref<User>({
    username: "",
    email: "",
    password: ""
})

const submitted = ref<boolean>(false);
const loading = ref<boolean>(false);

const status = ref<Status>({
    show: false,
    success: false,
    msg: ''
});

const config = useRuntimeConfig();
const secretKey = config.public.secretKey;

const submitCheck = async (): Promise<void> => {
    submitted.value = true;
    if (user.value.email != "") {
        try {
            loading.value = true;
            await authService.getEmail(user.value.email).then(async (response: any) => {
                status.value.success = true;
                status.value.msg = "Please check your email for the reset password link!";
                const encrypt = AES.encrypt(user.value.email.toLowerCase(), secretKey).toString();
                const encryptedText = encodeURIComponent(encrypt);
                console.log(encryptedText);
                await authService.resetToken(user.value.email.toLowerCase(), encryptedText);
                user.value.email = "";
            })
        } catch (error: any) {
            console.log(error);
            if (error?.response?.status == 404) {
                status.value.show = true;
                status.value.success = false;
                status.value.msg = "Email Not Found!";
            } else {
                console.log(error);
            }
        } finally {
            loading.value = false;
            status.value.show = true;
        }
    }
}

const closeStatus = (): void => {
    status.value.show = false;
    submitted.value = false;
}

const goBack = (): void => {
    navigateTo({ name: "login" });
}
</script>