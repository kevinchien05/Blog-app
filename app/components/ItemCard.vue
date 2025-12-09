<template>
    <div class="rounded-lg h-[175px] border card">
        <div class="flex flex-col gap-2 my-2 mx-3">
            <slot name="header"></slot>
            <div class="card rounded-md bg-gray-100 h-[100px]">
                <slot name="body"></slot>
            </div>
            <div class="font-semibold text-xs">
                <slot name="footer"></slot>
            </div>
        </div>
    </div> 
</template>