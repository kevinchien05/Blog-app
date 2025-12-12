<template>
    <div class="flex sm:hidden items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow">
        <div class="flex items-center space-x-2">
            <img class="h-8" width="40" height="40" src="/logo.png" alt="">
            <span class="font-semibold text-blue-800 dark:text-blue-600">Blog<span
                    class="font-bold text-blue-950 dark:text-blue-800">App</span></span>
        </div>
        <button @click="toggleMenu" class="text-gray-700 dark:text-white">
            <div v-if="!isMenuOpen"><i class="pi pi-bars text-2xl"></i></div>
            <div v-else><i class="pi pi-times text-2xl"></i></div>
        </button>
    </div>

    <!-- Dropdown Menu -->
    <!-- <div v-if="isMenuOpen" class="sm:hidden bg-white dark:bg-gray-800 border-t px-4 py-2"> -->
    <div v-if="isMenuOpen"
        class="sm:hidden absolute top-14 left-0 w-full z-50 bg-white dark:bg-gray-800 shadow-md px-4 py-2">
        <div v-for="(group, index) in filteredItems" :key="index">
            <div v-for="item in group.items" :key="item.label" class="mb-1">
                <div v-if="!item.command">
                    <NuxtLink :to="{ name: item.page }"
                        class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'border-1 border-solid text-black dark:border-blue-900 dark:text-white': isActive(item.active) }">
                        <i :class="item.icon"></i>
                        <span>{{ item.label }}</span>
                    </NuxtLink>
                </div>
                <div v-else>
                    <div class="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        @click="item.command">
                        <i :class="item.icon"></i>
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();

const isActive = (itemPage: string[]): boolean => {
    if (itemPage) {
        return itemPage.includes(String(route.name));
    } else {
        return false;
    }
}

const logout = (): void => {
    navigateTo("/login");
}

const items = ref([
    { separator: true },
    {
        items: [
            { label: 'Home', icon: 'pi pi-home', page: 'index', active: ['index', 'blog'] },
            { label: 'Dashboard', icon: 'pi pi-th-large', page: 'admin', active: ['admin'] },
            { label: 'Logout', icon: 'pi pi-sign-out', command: logout }
        ]
    }
]);

const isMenuOpen = ref<boolean>(false);
const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value;
};

const filteredItems = computed(() => 
    items.value.filter(item => item.items) // filter out separators
);
</script>