<template>
    <NuxtLayout>
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
                            :feedback="false" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="newPassword" class="font-semibold">New Password</label>
                        <Password inputId="newPassword" v-model="user.password" class="w-full" toggleMask
                            :feedback="false" />
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="confirmPassword" class="font-semibold">Confirm Password</label>
                        <Password inputId="confirmPassword" v-model="user.confirmPassword" class="w-full" toggleMask
                            :feedback="false" />
                    </div>
                </div>
                <div class="flex mt-6 gap-2">
                    <Button label="Cancel" variant="outlined" severity="danger" type="button" class="w-full" @click="goBack"/>
                    <Button label="Submit" type="submit" class="w-full" />
                </div>
            </form>
        </div>
    </NuxtLayout>
</template>
<script setup lang="ts">
import type { User } from '~/types/user';

const route = useRoute();

const user = ref<User>({
    username: "",
    email: route.query.email?.toString() ?? "",
    password: "",
    oldPassword: "",
    confirmPassword: ""
});

const goBack = (): void => {
    navigateTo({ name: 'login' });
}

const submitChange = (): void => {
    console.log(user.value);
}
</script>