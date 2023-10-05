<template>
    <h1>Посты</h1> <!--заменили vmodel на два действия из за привязки к vuex-->
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
        <my-button  @click="showDialog">Создать пост</my-button>
        <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        PostForm, PostList, Pagination
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    mounted() {
        console.log(this.$store.state.isAuth)
        this.fetchPosts();
    }, 
    methods: { 
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            removePost: 'post/removePost'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        showDialog() {
            this.dialogVisible = true;
        },
        createPost(newPost) {
            this.posts.push(newPost);
            this.dialogVisible = false;
        },
        //changePage(pageNumber) { this.page = pageNumber;}
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    }
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