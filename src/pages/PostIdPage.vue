<template>
    <div>
        <h1>Это страница с ID = {{ $route.params.id }} </h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                postTitle: '',
                postMessage: ''
            }
        },
        mounted() {
            this.loadMorePosts();
        }, 
        methods: { 
            async loadMorePosts() { 
                try {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`);
                    const json = await response.json();
                    this.postTitle = json.title;
                    this.postMessage = json.body;
                } catch (e) {
                    alert('Произошла ошибка при загрузке');
                } 
            }
        }
    }
</script>

<style scoped></style>