<template>
    <div class="flex justify-center p-10"><span class="font-bold text-2xl">{{ msg }}</span></div>
</template>
<script setup lang="ts">
import { createAuthService } from '~/service/AuthService';

const route = useRoute();

const { $api } = useNuxtApp();
const authService = createAuthService($api);
const msg = ref<string>("");

definePageMeta({
    layout: "verify"
})

onBeforeMount(() => {
    verifyEmail();
})

const verifyEmail = async (): Promise<void> => {
    await authService.verifyEmail(String(route.query.token)).then(response => {
        msg.value = response.data.message;
    }).catch(error =>{
        msg.value = error.response.data.message;
    })
}
</script>