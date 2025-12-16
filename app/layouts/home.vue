<template>
    <div class="min-h-screen flex flex-col sm:flex-row">
        <ClientOnly>
            <Sidebar />
            <MobileNavBar />
        </ClientOnly>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue';
import MobileNavBar from '~/components/MobileNavBar.vue';
</script>