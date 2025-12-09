<template>
    <NuxtLayout name="home">
        <BodyContent class="flex-1 overflow-y-auto" justify="between">
            <template #header>
                <span class="font-bold text-xl">Admin Dashboard</span>
            </template>
            <template #body>
                <div class="card">
                    <DataTable class="flex-1" resizableColumns columnResizeMode="fit" v-model:filters="filters" :value="dataList" show-gridlines
                        tableStyle="min-width: 900px" scrollable scrollHeight="flex" removableSort>
                        <template #header>
                            <div class="flex justify-between items-center">
                                <Button label="Add" icon="pi pi-plus" severity="contrast"/>
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
                                    <Select size="small" :options="itemPage" optionValue="value" optionLabel="name" v-model="size"/>
                                </div>
                                <div class="flex items-center gap-1">
                                    <Button icon="pi pi-angle-left" size="small" variant="text" severity="contrast"/>
                                    <Button icon="pi pi-angle-right" size="small" variant="text" severity="contrast"/>
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
                                {{ capitalize(slotProps.data.name) }}
                            </template>
                        </Column>
                        <Column field="description" header="Description" style="width: 25%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                <span class="line-clamp-1">
                                    {{ slotProps.data.description }}
                                </span>
                            </template>
                        </Column>
                        <Column field="postDate" header="Post Date" sortable style="width: 10%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body="slotProps">
                                {{ showDate(slotProps.data.postDate) }}
                            </template>
                        </Column>
                        <Column field="action" header="Action" style="width: 20%;">
                            <template #body v-if="loading">
                                <Skeleton height="1.5rem" />
                            </template>
                            <template #body>
                                <div class="flex items-center gap-1">
                                    <Button icon="pi pi-pencil" severity="contrast" />
                                    <Button icon="pi pi-trash" severity="danger" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </BodyContent>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { capitalize } from 'vue';
import { showDate } from '~/func/formatDate';
import type { Blog } from '~/types/blog';
import { FilterMatchMode } from '@primevue/core/api';
import type { page } from '~/types/page';

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
        name: "Tes",
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