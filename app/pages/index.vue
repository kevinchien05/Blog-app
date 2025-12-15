<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto" justify="between">
            <template #header>
                <div class="flex gap-2 items-center">
                    <span class="font-semibold">Sort by Date</span>
                    <Button :icon="sorting.icon" :label="sorting.label" icon-pos="right" text severity="contrast"
                        @click="sortData" />
                </div>
                <IconField class="flex items-center">
                    <InputIcon class="pi pi-search" />
                    <InputText class="w-full" placeholder="Search" aria-autocomplete="none" />
                </IconField>
            </template>
            <template #body>
                <div class="flex flex-col gap-2">
                    <span class="font-bold text-2xl">List of Blog</span>
                    <hr class="w-full">
                    <div class="h-[88dvh] overflow-y-auto scroll-hidden">
                        <div class="flex flex-wrap gap-3">
                            <ItemCard v-for="(i, index) in 3" class="sm:basis-[98%] md:basis-[48%] xl:basis-[32%] rounded-lg"
                                @click="changePage(index)">
                                <template #header>
                                    <span class="font-semibold text-xl">Tes Blog</span>
                                </template>
                                <template #body>
                                    <span class="text-sm line-clamp-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi ipsa quo libero possimus? Qui nemo ducimus nisi reprehenderit tenetur adipisci autem commodi quae voluptatibus, vel quisquam modi ipsa, quia sapiente!</span>
                                </template>
                                <template #footer>
                                    <span>09 Desember 2025</span>
                                </template>
                            </ItemCard>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs">Items per page</span>
                            <Select v-model="size" size="small" :options="itemPage" optionLabel="name"
                                optionValue="value" />
                        </div>
                        <div class="flex items-center gap-1">
                            <Button icon="pi pi-angle-left" variant="text" size="small" severity="contrast" />
                            <Button icon="pi pi-angle-right" variant="text" size="small" severity="contrast" />
                        </div>
                    </div>
                </div>
            </template>
        </BodyContent>
    </NuxtLayout>
</template>
<script setup lang="ts">
import type { page, sort } from '~/types/page';

const userStore = useUserStore();

const sorting = ref<sort>({
    label: "Asc",
    icon: "pi pi-sort"
});

const size = ref<number>(5);

const itemPage = ref<page[]>([
    {
        name: "5",
        value: 5
    },
    {
        name: "15",
        value: 15
    },
    {
        name: "30",
        value: 30
    },
])

const sortData = (): void => {
    if (sorting.value.label == "Asc") {
        sorting.value.label = "Desc";
        sorting.value.icon = "pi pi-sort-down-fill";
    } else {
        sorting.value.label = "Asc";
        sorting.value.icon = "pi pi-sort-up-fill";
    }
}

const changePage = (index: number): void => {
    navigateTo({ name: 'blog', query: { id: index } });
}
</script>