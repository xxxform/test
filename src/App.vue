<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button  @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-list 
            :posts="sortedAndSearchedPosts"
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
            selectedSort: '',
            searchQuery: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
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
    computed: {
        sortedPosts() {
            return [...this.posts].sort(((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
            }));
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
</style>