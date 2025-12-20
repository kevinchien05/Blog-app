<template>
    <div class="bg-surface-0 dark:bg-surface-900 rounded-border shadow-xl w-11/12 lg:w-6/12 mx-auto p-6">
        <div class="flex justify-center">
            <div class="flex flex-col items-center gap-2">
                <img src="/logo.png" alt="" height="100" width="100">
                <span class="font-bold text-3xl">Sign Up</span>
                <span class="font-semibold text-xs sm:text-lg">Enter your details to create new account</span>
            </div>
        </div>
        <form @submit.prevent="registerUser">
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
                    <label for="username" class="font-semibold">Username</label>
                    <InputText id="username" :invalid="submitted && !user.username" v-model="user.username"
                        placeholder="abcde" class="w-full" @input="formatCheck('username')" />
                    <span v-if="submitted && !user.username" class="text-xs text-red-600 mt-1">Username is
                        empty!</span>
                    <span v-if="submitted && user.username && error.username" class="text-xs text-red-600 mt-1">{{
                        message.username }}</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email" class="font-semibold">Email</label>
                    <InputText id="email" :invalid="submitted && !user.email" v-model="user.email"
                        placeholder="abcde@gmail.com" class="w-full" @input="formatCheck('email')" />
                    <span v-if="submitted && !user.email" class="text-xs text-red-600 mt-1">Email is empty!</span>
                    <span v-if="submitted && user.email && error.email" class="text-xs text-red-600 mt-1">{{
                        message.email
                    }}</span>

                </div>
                <div class="flex flex-col gap-1">
                    <label for="password" class="font-semibold">Password</label>
                    <Password inputId="password" :invalid="submitted && !user.password" v-model="user.password"
                        class="w-full" toggleMask :feedback="false" @input="formatCheck('password')" />
                    <span v-if="submitted && !user.password" class="text-xs text-red-600 mt-1">Password is
                        empty!</span>
                    <span v-if="submitted && user.password && error.password" class="text-xs text-red-600 mt-1">{{
                        message.password }}</span>

                </div>
                <div class="flex flex-col gap-1">
                    <label for="passwordConfirmation" class="font-semibold">Confirm Password</label>
                    <Password inputId="passwordConfirmation" :invalid="submitted && !user.confirmPassword"
                        v-model="user.confirmPassword" class="w-full" toggleMask :feedback="false" />
                    <span v-if="submitted && !user.confirmPassword" class="text-xs text-red-600 mt-1">Confirm
                        Password is
                        empty!</span>
                    <span v-if="submitted && error.confirmPassword && user.confirmPassword"
                        class="text-xs text-red-600 mt-1">{{ message.confirmPassword }}</span>
                </div>
            </div>
            <div class="flex items-center gap-2 mt-4">
                <Checkbox v-model="user.terms" binary :invalid="submitted && !user.terms" />
                <span class="font-semibold">I have read the <span class="text-blue-600 dark:text-blue-300">Term and
                        Condition</span></span>
            </div>
            <div class="flex flex-col mt-4 gap-2">
                <Button label="Create Free Account" type="submit" :disabled="loading">
                    <template v-if="loading">
                        <span><i class="pi pi-spin pi-spinner"></i> Registering...</span>
                    </template>
                </Button>
                <span class="font-semibold text-center">Already have an account? <NuxtLink :to="{ name: 'login' }"
                        class="text-blue-600 dark:text-blue-300">Sign in</NuxtLink></span>
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { createAuthService } from '~/service/AuthService';
import type { Status } from '~/types/status';
import type { User } from '~/types/user';

const { $api } = useNuxtApp()
const authService = createAuthService($api);

const user = ref<User>({
    username: "",
    email: "",
    password: "",
    terms: false,
    confirmPassword: "",
    role: "USER"
});

const loading = ref<boolean>(false);
const status = ref<Status>({
    show: false,
    success: true,
    msg: ""
});
const submitted = ref<boolean>(false);

const userRegex = /^[a-zA-Z][a-zA-Z0-9_]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,50}$/;

const error = ref({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
})

const message = ref({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
})

const closeStatus = (): void => {
    submitted.value = false;
    status.value.success = true;
    status.value.msg = "";
    status.value.show = false;
}

const clear = (): void => {
    submitted.value = false;
    user.value.username = "";
    user.value.email = "";
    user.value.password = "";
    user.value.terms = false;
    user.value.confirmPassword = "";

}

const registerUser = async (): Promise<void> => {
    submitted.value = true;
    if (user.value.username != "" && user.value.email != "" && user.value.password != "") {
        if (!error.value.username && !error.value.email && !error.value.password) {
            if (user.value.password === user.value.confirmPassword) {
                error.value.confirmPassword = false;
                if (user.value.terms) {
                    try {
                        loading.value = true;
                        await authService.registerUser(user.value).then(response => {
                            status.value.show = true;
                            status.value.success = true;
                            status.value.msg = "Account Created, Please Verify Your Email!";
                            clear();
                        })
                    } catch (error: any) {
                        status.value.show = true;
                        status.value.success = false;
                        status.value.msg = error.response.data;
                    } finally {
                        loading.value = false;
                    }
                }
            } else {
                error.value.confirmPassword = true;
                message.value.confirmPassword = "Password is not match!";
            }
        }
    }
}

function formatCheck(param: string) {
    if (param == "username") {
        if (user.value.username.length < 3) {
            error.value.username = true;
            message.value.username = "Username must be atleast 3 characters";
        } else if (!userRegex.test(user.value.username)) {
            error.value.username = true;
            message.value.username = "Username format is not valid";
        } else {
            error.value.username = false;
        }
    } else if (param == "email") {
        if (!emailRegex.test(user.value.email)) {
            error.value.email = true;
            message.value.email = "Email format is not valid";
        } else {
            error.value.email = false;
        }
    } else if (param == "password") {
        if (!passRegex.test(user.value.password)) {
            error.value.password = true;
            message.value.password = "Password must be atleast 6 characters, one capital word, one numeric character"
        } else {
            error.value.password = false;
        }
    }
}
</script>