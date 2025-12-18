<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto">
            <template #header>
                <!-- <div class="flex gap-2 items-center">
                    <span class="font-semibold">Sort by Date</span>
                    <Button :icon="sorting.icon" :label="sorting.label" icon-pos="right" text severity="contrast"
                        @click="sortData" />
                </div> -->
                <IconField class="flex items-center">
                    <InputIcon class="pi pi-search" />
                    <InputText class="w-full" placeholder="Search" aria-autocomplete="none" v-model="search" />
                </IconField>
            </template>
            <template #body>
                <div class="flex flex-col gap-2">
                    <span class="font-bold text-2xl">List of Blog</span>
                    <hr class="w-full">
                    <div class="h-[88dvh] overflow-y-auto scroll-hidden">
                        <div class="flex flex-wrap gap-3">
                            <ItemCard v-for="(blog, index) in searchProject"
                                class="sm:basis-[98%] md:basis-[48%] xl:basis-[32%] rounded-lg"
                                @click="changePage(blog.id)">
                                <template #header>
                                    <span class="font-semibold text-xl">{{ blog.name }}</span>
                                </template>
                                <template #body>
                                    <span class="text-sm line-clamp-5">{{ blog.description }}</span>
                                </template>
                                <template #footer>
                                    <NuxtTime :datetime="blog.postDate" locale="id-ID" month="long" year="numeric"
                                        day="numeric" />
                                </template>
                            </ItemCard>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xs">Items per page</span>
                            <Select v-model="size" size="small" :options="itemPage" optionLabel="name"
                                optionValue="value" @value-change="changeSize" />
                        </div>
                        <div class="flex items-center gap-1">
                            <Button icon="pi pi-angle-left" variant="text" size="small" severity="contrast"
                                @click="changeDirection('prev')" :disabled="page == 0" />
                            <Button icon="pi pi-angle-right" variant="text" size="small" severity="contrast"
                                @click="changeDirection('next')"
                                :disabled="page + 1 == blogList.totalPages || blogList.totalPages <= 1" />
                        </div>
                    </div>
                </div>
            </template>
        </BodyContent>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { list } from '@primeuix/themes/aura/autocomplete';
import AES from 'crypto-js/AES';
import { showDate } from '~/func/formatDate';
import { createBlogService } from '~/service/BlogService';
import type { page, sort } from '~/types/page';
import { useDebounce } from '@vueuse/core';

onMounted(async () => {
    try {
        loading.value = true;
        await getBlog(page.value, size.value);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
})

const userStore = useUserStore();

const sorting = ref<sort>({
    label: "Asc",
    icon: "pi pi-sort"
});

const loading = ref<boolean>(false);
const size = ref<number>(5);
const page = ref<number>(0);

const { $api } = useNuxtApp();
const blogService = createBlogService($api);
const config = useRuntimeConfig();
const secretKey = config.public.secretKey;

const blogList = ref<any>({});

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
    const encrypt = AES.encrypt(String(index), secretKey).toString();
    const encryptedText = encodeURIComponent(encrypt);
    navigateTo({ name: 'blog', query: { id: encryptedText } });
}

const getBlog = async (page: number, size: number): Promise<void> => {
    await blogService.getBlogList(page, size).then((response: any) => {
        blogList.value = response.data;
    });
}

const changeSize = async (): Promise<void> => {
    try {
        loading.value = true;
        page.value = 0;
        await getBlog(page.value, size.value);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const changeDirection = async (direction: string): Promise<void> => {
    try {
        loading.value = true;
        if (direction == "prev") {
            page.value--;
            await getBlog(page.value, size.value);
        } else {
            page.value++;
            await getBlog(page.value, size.value);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const search = ref<string>("");
const debouncedSearch = useDebounce(search, 300);
const searchProject = computed(() => {
    const list = blogList.value?.content ?? [];
    if (!debouncedSearch.value) {
        return list;
    }
    return list.filter((p: { name: string; }) => p.name.toLowerCase().includes(String(debouncedSearch.value).toLowerCase()));
})
</script>