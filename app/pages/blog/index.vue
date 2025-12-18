<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto">
            <template #header>
                <Button icon="pi pi-angle-left" label="Back" variant="text" severity="contrast" @click="back" />
            </template>
            <template #body>
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold">{{ blog?.name }}</span>
                        <span class="text-md font-semibold">Post Date :
                            <NuxtTime :datetime="blog?.postDate as Date" locale="id-ID" day="numeric" month="long"
                                year="numeric" />
                        </span>
                    </div>
                    <hr class="w-full">
                    <div class="w-full h-[88dvh] bg-stone-50 overflow-y-auto scroll-hidden p-2">
                        <div><span>{{ blog?.description }}</span>
                        </div>
                    </div>
                </div>
            </template>
        </BodyContent>
    </NuxtLayout>
</template>
<script setup lang="ts">
import AES from 'crypto-js/AES';
import Utf8 from 'crypto-js/enc-utf8';
import { createBlogService } from '~/service/BlogService';
import type { Blog } from '~/types/blog';

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const secretKey = config.public.secretKey;
const back = (): void => {
    router.back();
}
const loading = ref<boolean>(false);
const { $api } = useNuxtApp();
const blogService = createBlogService($api);
const blog = ref<Blog>()
onBeforeMount(async () => {
    try {
        loading.value = true;
        const decoded = decodeURIComponent(String(route.query.id));
        const bytes = AES.decrypt(decoded, secretKey);
        const decryptText = bytes.toString(Utf8);
        await blogService.getDetailBlog(Number(decryptText)).then((response) => {
            blog.value = response.data;
        })
    } catch (error) {

    } finally {

    }
})
</script>