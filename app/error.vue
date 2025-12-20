<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
    error: NuxtError
}>()

const handleError = () => {
    clearError({ redirect: '/' })
}
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <h1 class="text-5xl font-bold">
            {{ error.statusCode }}
        </h1>

        <p class="mt-4 text-gray-500">
            {{ error.statusMessage }}
        </p>

        <button class="mt-6 px-4 py-2 bg-black text-white rounded" @click="handleError">
            Kembali ke Home
        </button>
    </div>
</template>
