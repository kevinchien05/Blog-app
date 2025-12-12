<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto">
            <template #header>
                <Button icon="pi pi-angle-left" label="Back" variant="text" severity="contrast" @click="back" />
            </template>
            <template #body>
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold">Test Blog</span>
                        <span class="text-md font-semibold">Post Date : 09 Desember 2025</span>
                    </div>
                    <hr class="w-full">
                    <div class="w-full h-[88dvh] bg-stone-50 overflow-y-auto scroll-hidden p-2">
                        <div v-for="i in 100"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
                                aliquam perferendis, dolores iste recusandae aut cum. Molestias at architecto animi
                                eveniet doloremque, ab, perferendis libero explicabo eaque iusto aperiam labore.</span>
                        </div>
                    </div>
                </div>
            </template>
        </BodyContent>
    </NuxtLayout>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const back = (): void => {
    router.back();
}
</script>