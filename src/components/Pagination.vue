<template>
<div class="page__wrapper">
    <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber" 
        class="page"
        :class="{
            'current-page': modelValue === pageNumber
        }"
        @click="updatePage(pageNumber)"
    >
        {{ pageNumber }}
    </div>
</div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Number
        },
        totalPages: { 
            type: Number
        }
    },
    methods: {
        updatePage(pageNumber) {
            this.$emit('update:modelValue', pageNumber);

        }
    }
}
</script>

<style>
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}
</style>