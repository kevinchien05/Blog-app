<template>
    <div class="min-h-screen flex flex-col sm:flex-row">
        <Sidebar />
        <MobileNavBar />
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue';
import MobileNavBar from '~/components/MobileNavBar.vue';
</script>