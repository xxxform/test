<template>
    <h1>{{ $store.state.isAuth ? 'Пользователь авторизован' : 'Авторизуйтесь' }}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
        <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
        <my-button @click="$store.commit('decrementLikes')">Диз</my-button>
    </div>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
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
    <div class="observer" v-intersection="loadMorePosts"></div>
    <!--<pagination v-model="page" :totalPages="totalPages"></pagination>-->
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';

export default {
    components: {
        PostForm, PostList, Pagination
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
        }
    },
    mounted() {
        this.loadMorePosts();
    }, 
    methods: { 
        async loadMorePosts() { 
            this.page += 1;
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`);
                const json = await response.json();

                this.totalPages = Math.ceil(response.headers.get('x-total-count') / this.limit);
                this.posts.push(...json);

            } catch (e) {
                alert('Произошла ошибка при загрузке');
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
        },
        //changePage(pageNumber) { this.page = pageNumber;}
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
    //watch: {page() {this.fetchPosts();}}
}
</script>

<style>

.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.observer {
    height: 30px;
    background: green;
}
</style>