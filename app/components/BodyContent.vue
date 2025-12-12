<template>
    <div class="ml-5 py-2 overflow-hidden">
        <div :class="`header flex ${flex} items-center justify-${justify} mr-5 sm:mr-10`">
            <slot name="header"></slot>
        </div>
        <div class="body mt-3 mr-5 sm:mr-10">
          <div class="min-w-full">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  justify: {
    type: String,
    default: 'end', // default to 'end' if not provided
    validator: value => ['start', 'end', 'center', 'between', 'around', 'evenly'].includes(value),
  },
  flex: {
    type: String,
    required: false
  },
});
</script>