<template>
    <div class="post">
        <div>
            <div><strong>Название:</strong> {{ postTitle }}</div>
            <div><strong>Описание:</strong> {{ postMessage }}</div>
        </div>
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

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>