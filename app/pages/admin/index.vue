<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto" justify="between">
            <template #header>
                <span class="font-bold text-xl">Admin Dashboard</span>
            </template>
            <template #body>
                <div class="card">
                    <DataTable class="flex-1" :resizableColumns="true" columnResizeMode="fit" v-model:filters="filters"
                        :value="dataList" show-gridlines tableStyle="min-width: 900px; table-layout: fixed;" scrollable
                        scrollHeight="flex" removableSort>
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
                                        v-model="size" />
                                </div>
                                <div class="flex items-center gap-1">
                                    <Button icon="pi pi-angle-left" size="small" variant="text" severity="contrast" />
                                    <Button icon="pi pi-angle-right" size="small" variant="text" severity="contrast" />
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
                                    {{ slotProps.data.description }}
                                </span>
                            </template>
                        </Column>
                        <Column field="postDate" header="Post Date" sortable style="width: 15%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                {{ showDate(slotProps.data.postDate) }}
                            </template>
                        </Column>
                        <Column field="action" header="Action" style="width: 15%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body>
                                <div class="flex items-center gap-1">
                                    <Button icon="pi pi-pencil" severity="contrast" @click="openDialog('edit')"/>
                                    <Button icon="pi pi-trash" severity="danger" @click="confirmDelete()"/>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </BodyContent>

        <!-- dialog untuk tambah blog -->
        <Dialog v-model:visible="showDialog" modal :style="{ width: '450px' }" class="mx-5">
            <template #header>
                <span class="text-lg font-bold">{{ title }}</span>
            </template>
            <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                    <label for="name" class="font-semibold">Name</label>
                    <InputText id="name" class="w-full" v-model="blog.name" />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="description" class="font-semibold">Description</label>
                    <Textarea inputId="description" v-model="blog.description" rows="5" />
                </div>
            </div>
            <template #footer>
                <div class="flex items-center gap-2">
                    <Button label="Cancel" severity="danger" @click="closeDialog" />
                    <Button label="Submit" severity="contrast" @click="submitBlog" />
                </div>
            </template>
        </Dialog>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { capitalize } from 'vue';
import { showDate } from '~/func/formatDate';
import type { Blog } from '~/types/blog';
import { FilterMatchMode } from '@primevue/core/api';
import type { page } from '~/types/page';
import { confirmDelete } from '~/func/confirmDelete';

const blog = ref<Blog>({
    name: "",
    description: "",
})

const showDialog = ref<boolean>(false);
const title = ref<string>("Add Blog");

const openDialog = (section?: string): void => {
    clearBlog();
    showDialog.value = true;
    if(section == "edit"){
        title.value = "Edit Blog";
    }else{
        title.value = "Add Blog";
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

const submitBlog = (): void => {
    console.log(blog.value);
}

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
    {
        name: "50",
        value: 50
    },
])

const loading = ref<boolean>(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const dataList = ref<Blog[]>([
    {
        id: 1,
        name: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit id voluptas explicabo vel reprehenderit expedita quia nemo est porro, perspiciatis quaerat alias rem libero, perferendis ipsum eum natus quos corrupti.",
        postDate: new Date()
    },
    {
        id: 2,
        name: "Tes1",
        description: "coba",
        postDate: new Date()
    },
    {
        id: 3,
        name: "Tes2",
        description: "coba",
        postDate: new Date()
    },
    {
        id: 4,
        name: "Tes3",
        description: "coba",
        postDate: new Date()
    },
    {
        id: 5,
        name: "Tes4",
        description: "coba",
        postDate: new Date()
    },
]);
</script>