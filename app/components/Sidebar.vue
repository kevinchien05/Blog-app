<template>
    <div class="hidden sm:flex card rounded-lg">
        <Menu :model="items" class="w-full">
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-2">
                    <img class="h-8" width="40" height="40" src="/logo.png" alt="">
                    <span class="font-semibold text-blue-800 dark:text-blue-600">Blog<span
                            class="font-bold text-blue-950 dark:text-blue-800">App</span></span>
                </span>
            </template>
            <template #item="{ item, props }">
                <div>
                    <NuxtLink :to="{ name: item.page }" v-if="item.status == String(userStore.data?.role) || item.status == 'PUBLIC'"
                        class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'border-1 border-solid text-black dark:border-blue-900 dark:text-white': isActive(item.active) }"
                        v-bind="props.action">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </NuxtLink>
                </div>
            </template>
        </Menu>
    </div>
</template>
<script setup lang="ts">
import { createAuthService } from '~/service/AuthService';

const route = useRoute();
const userStore = useUserStore();
const {$api} = useNuxtApp();
const authService = createAuthService($api);

const isActive = (itemPage: string[]): boolean => {
    if (itemPage) {
        return itemPage.includes(String(route.name));
    } else {
        return false;
    }
}

const logout: any = async (): Promise<void> => {
    await authService.logoutUser();
    await userStore.logout();
    navigateTo("/login");
}

const items = ref([
    { separator: true },
    {
        items: [
            { label: 'Home', icon: 'pi pi-home', page: 'index', active: ['index', 'blog'], status: "PUBLIC"},
            { label: 'Dashboard', icon: 'pi pi-th-large', page: 'admin', active: ['admin'], status: "ADMIN" },
            { label: 'Logout', icon: 'pi pi-sign-out', command: logout, status: "PUBLIC" }
        ]
    }
]);
</script>