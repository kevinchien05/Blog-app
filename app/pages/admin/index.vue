<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto" justify="between">
            <template #header>
                <span class="font-bold text-xl">Admin Dashboard</span>
            </template>
            <template #body>
                <div class="card">
                    <DataTable class="flex-1" :resizableColumns="true" columnResizeMode="fit" v-model:filters="filters"
                        :value="blogList.content" show-gridlines tableStyle="min-width: 900px; table-layout: fixed;"
                        scrollable scrollHeight="flex" removableSort>
                        <template #header>
                            <div class="flex justify-between items-center">
                                <Button label="Add" icon="pi pi-plus" severity="contrast" @click="openDialog()" />
                                <IconField>
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                                </IconField>
                            </div>
                        </template>
                        <template #empty>
                            <div class="flex justify-center"><span class="font-bold">No Blog found.</span></div>
                        </template>
                        <template #footer>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-1">
                                    <span class="text-xs">Items per page</span>
                                    <Select size="small" :options="itemPage" optionValue="value" optionLabel="name"
                                        v-model="size" @change="changeSize" />
                                </div>
                                <div class="flex items-center gap-1">
                                    <Button icon="pi pi-angle-left" size="small" variant="text" severity="contrast"
                                        :disabled="page == 0" @click="changePage('prev')" />
                                    <Button icon="pi pi-angle-right" size="small" variant="text" severity="contrast"
                                        :disabled="page + 1 == blogList.totalPages || blogList.totalPages == 0"
                                        @click="changePage('next')" />
                                </div>
                            </div>
                        </template>
                        <Column field="id" header="No." sortable style="width: 10%">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                {{ slotProps.index + 1 + "." }}
                            </template>
                        </Column>
                        <Column field="name" header="Name" sortable style="width: 15%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                <span class="ellipsis-multiline">{{ capitalize(slotProps.data.name) }}</span>
                            </template>
                        </Column>
                        <Column field="description" header="Description" style="min-width: 200px;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                <span class="ellipsis-multiline">
                                    {{ slotProps.data.description ? slotProps.data.description : "-" }}
                                </span>
                            </template>
                        </Column>
                        <Column field="postDate" header="Post Date" sortable style="width: 15%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                {{ showDate(new Date(slotProps.data.postDate)) }}
                            </template>
                        </Column>
                        <Column field="action" header="Action" style="width: 15%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                <div class="flex items-center gap-1">
                                    <Button icon="pi pi-pencil" severity="contrast"
                                        @click="openDialog('edit', slotProps.data.id)" />
                                    <Button icon="pi pi-trash" severity="danger"
                                        @click="confirmDelete(() => deleteBlog(slotProps.data.id, slotProps.index))" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </BodyContent>

        <!-- dialog untuk tambah blog -->
        <LazyDialog v-model:visible="showDialog" modal :style="{ width: '450px' }" class="mx-5">
            <template #header>
                <span class="text-lg font-bold">{{ title }}</span>
            </template>
            <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                    <label for="name" class="font-semibold">Name</label>
                    <InputText v-if="!edit" id="name" class="w-full" v-model="blog.name" />
                    <InputText v-else id="name" class="w-full" v-model="editData.name" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="description" class="font-semibold">Description</label>
                    <Textarea v-if="!edit" inputId="description" v-model="blog.description" rows="5" />
                    <Textarea v-else inputId="description" v-model="editData.description" rows="5" />
                </div>
            </div>
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button label="Cancel" severity="danger" @click="closeDialog" />
                    <Button v-if="!edit" label="Submit" severity="contrast" @click="submitBlog" :disabled="taskLoading">
                        <template v-if="taskLoading">
                            <span><i class="pi pi-spin pi-spinner"></i></span>
                        </template>
                    </Button>
                    <Button v-else label="Submit" severity="contrast" @click="editBlog(editData.id)" :disabled="taskLoading">
                        <template v-if="taskLoading">
                            <span><i class="pi pi-spin pi-spinner"></i></span>
                        </template>
                    </Button>
                </div>
            </template>
        </LazyDialog>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { capitalize } from 'vue';
import { showDate } from '~/func/formatDate';
import type { Blog } from '~/types/blog';
import { FilterMatchMode } from '@primevue/core/api';
import type { page } from '~/types/page';
import { confirmDelete } from '~/func/confirmDelete';
import { createBlogService } from '~/service/BlogService';

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

const { $api } = useNuxtApp();
const blogService = createBlogService($api);
const taskLoading = ref<boolean>(false);

const blog = ref<Blog>({
    name: "",
    description: "",
})

const showDialog = ref<boolean>(false);
const title = ref<string>("Add Blog");
const blogList = ref<any>({});
const editData = ref<Blog>({
    id: 0,
    name: "",
    description: "",
});
const edit = ref<boolean>(false);

const openDialog = (section?: string, id?: number): void => {
    clearBlog();
    showDialog.value = true;
    if (section == "edit") {
        edit.value = true;
        title.value = "Edit Blog";
        editData.value = {...blogList.value.content.find((b: { id: number; }) => b.id === id)};
    } else {
        title.value = "Add Blog";
        edit.value = false;
    }
}

const closeDialog = (): void => {
    showDialog.value = false;
}

const clearBlog = (): void => {
    blog.value.name = "";
    blog.value.description = "";
    blog.value.postDate = new Date();
}

const getBlog = async (page: number, size: number): Promise<void> => {
    await blogService.getBlogList(page, size).then((response: any) => {
        blogList.value = response.data;
    });
}

const submitBlog = async (): Promise<void> => {
    try {
        taskLoading.value = true;
        await blogService.createBlog(blog.value).then((response: any) => {
            if (blogList.value.content.length >= size.value) {
                blogList.value.totalPages++;
            } else {
                blogList.value.content.push(response.data);
            }
            closeDialog();
        });
    } catch (error) {
        console.log(error);
    } finally {
        taskLoading.value = false;
    }
}

const deleteBlog = async (id: number, index: number): Promise<void> => {
    await blogService.deleteBlog(id).then(async () => {
        blogList.value.content = blogList.value.content.filter((b: { id: number; }) => b.id !== id);
        if (blogList.value.content.length == 0) {
            if (blogList.value.totalPages == page.value + 1) {
                try {
                    loading.value = true;
                    page.value -= 1;
                    await getBlog(page.value, size.value);
                } finally {
                    loading.value = false;
                }
            } else {
                try {
                    loading.value = true;
                    await getBlog(page.value, size.value);
                } finally {
                    loading.value = false;
                }
            }
        } else if (blogList.value.content.length < size.value && page.value + 1 < blogList.value.totalPages) {
            try {
                loading.value = true;
                await getBlog(page.value, size.value);
            } finally {
                loading.value = false;
            }
        }
    })
}


const editBlog = async (id?: number): Promise<void> => {
    try {
        taskLoading.value = true;
        await blogService.editBlog(editData.value, id).then((response) => {
            const idx = blogList.value.content.findIndex((b: { id: number; }) => b.id === id);
            if(idx > -1) blogList.value.content[idx] = response.data;
            closeDialog();
        });
    } catch (error) {
        console.log(error);
    } finally {
        taskLoading.value = false;
    }   
}
const size = ref<number>(5);
const page = ref<number>(0);

const changePage = async (direction: string): Promise<void> => {
    try {
        loading.value = true;
        if (direction == "prev") {
            page.value--;
            await getBlog(page.value, size.value);
        } else if (direction == 'next') {
            page.value++;
            await getBlog(page.value, size.value);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
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
    {
        name: "50",
        value: 50
    },
])

const loading = ref<boolean>(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>