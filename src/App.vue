<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-button style="margin: 15px 0;" @click="showDialog">Создать пост</my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-list 
            :posts="posts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идёт загрузка...</div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,

        }
    },
    mounted() {
        this.fetchPosts();
    }, 
    methods: { 
        async fetchPosts() {
            this.isPostsLoading = true;
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
                const json = await response.json();
                this.posts.push(...json);
            } catch (e) {
                alert('Произошла ошибка при загрузке');
            } finally {
                this.isPostsLoading = false;
            }
        },
        showDialog() {
            this.dialogVisible = true;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        }, 
        createPost(newPost) {
            this.posts.push(newPost);
            this.dialogVisible = false;
        }
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
</style>