<template>
    <div class="bg-surface-0 dark:bg-surface-900 rounded-border shadow-xl w-11/12 lg:w-6/12 mx-auto p-6">
        <div class="flex justify-center">
            <div class="flex flex-col items-center gap-2">
                <img src="/logo.png" alt="" height="100" width="100">
                <span class="font-bold text-3xl">Create a New Password</span>
                <span class="font-semibold">Enter your new password to reset your password</span>
            </div>
        </div>
        <form @submit.prevent="submitChange">
            <div class="flex flex-col mt-6 gap-3">
                <div class="flex flex-col gap-1">
                    <label for="oldPassword" class="font-semibold">Old Password</label>
                    <Password inputId="oldPassword" v-model="user.oldPassword" class="w-full" toggleMask
                        :feedback="false" :invalid="submitted && !user.oldPassword" />
                    <span v-if="submitted && !user.oldPassword" class="text-xs text-red-600">Old Password is
                        Empty!</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="newPassword" class="font-semibold">New Password</label>
                    <Password inputId="newPassword" v-model="user.password" class="w-full" toggleMask :feedback="false"
                        @input="formatCheck('password')"
                        :invalid="submitted && !user.password || submitted && user.password && format.status" />
                    <span v-if="submitted && !user.password" class="text-xs text-red-600">Password is Empty!</span>
                    <span v-if="submitted && user.password && format.status" class="text-xs text-red-600">{{
                        format.msg }}</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="confirmPassword" class="font-semibold">Confirm Password</label>
                    <Password inputId="confirmPassword" v-model="user.confirmPassword" class="w-full" toggleMask
                        :feedback="false"
                        :invalid="submitted && !user.confirmPassword || submitted && mismatch.status" />
                    <span v-if="submitted && !user.confirmPassword" class="text-xs text-red-600">Confirm Password is
                        Empty!</span>
                    <span v-if="submitted && mismatch.status" class="text-xs text-red-600">{{ mismatch.msg }}</span>
                </div>
            </div>
            <div class="flex mt-6 gap-2">
                <Button label="Cancel" variant="outlined" severity="danger" type="button" class="w-full"
                    @click="goBack" />
                <Button label="Submit" type="submit" class="w-full" />
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import type { User } from '~/types/user';
import Utf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import { createAuthService } from '~/service/AuthService';

const config = useRuntimeConfig();
const secretKey = config.public.secretKey;
const route = useRoute();
const { $api } = useNuxtApp();
const authService = createAuthService($api);
const loading = ref<boolean>(false);
const submitted = ref<boolean>(false);

const user = ref<User>({
    username: "",
    email: route.query.email?.toString() ?? "",
    password: "",
    oldPassword: "",
    confirmPassword: ""
});

const format = ref({
    status: false,
    msg: ""
});

const mismatch = ref({
    status: false,
    msg: ""
});

const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/;

function formatCheck(param: string) {
    if (param == "password") {
        if (!passRegex.test(user.value.password)) {
            format.value.status = true;
            format.value.msg = "Password must be atleast 6 characters, one capital word, one numeric character"
        } else {
            format.value.status = false;
        }
    }
}

const goBack = (): void => {
    navigateTo({ name: 'login' });
}

const submitChange = async (): Promise<void> => {
    submitted.value = true;
    if (user.value.oldPassword != "" && user.value.password != "" && user.value.confirmPassword != "" && !format.value.status) {
        if (user.value.password === user.value.confirmPassword) {
            mismatch.value.status = false;
            try {
                loading.value = true;
                const bytes = AES.decrypt(route.query.email as string, secretKey);
                const decryptText = bytes.toString(Utf8);
                console.log(decryptText);
                await authService.changePass(decryptText, user.value.password).then(() => {
                    navigateTo('/login');
                });
            } catch (error: any) {
                console.log(error);
            } finally {
                loading.value = false;
            }
        } else {
            mismatch.value.status = true;
            mismatch.value.msg = "Password is not same!";
        }
    }
}
</script>