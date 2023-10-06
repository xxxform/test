<template>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."/>
    <div class="app__btns">
        <my-button  @click="showDialog">Создать пост</my-button>
        <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
        <post-form/>
    </my-dialog>
    <post-list 
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-else>Идёт загрузка...</div>
    <!--<pagination v-model="page" :totalPages="totalPages"></pagination>-->
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';


export default {
    components: {
        PostForm, PostList, Pagination
    },
    data() {
        return {
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ],
            dialogVisible: false
        }
    },
    setup(props) {
        const { posts, isPostsLoading, totalPages } = usePosts(10);
        const { sortedPosts, selectedSort } = useSortedPosts(posts);
        const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

        return { 
            posts, 
            totalPages,
            isPostsLoading, 
            sortedPosts,
            selectedSort, 
            searchQuery, 
            sortedAndSearchedPosts
        }
    }, 
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
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