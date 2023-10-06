import { ref, onMounted } from 'vue';

export default function usePosts(limit) {
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostsLoading = ref(true);

    const fetching = async() => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${1}`);
            const json = await response.json();
    
            totalPages.value = Math.ceil(response.headers.get('x-total-count') / limit);
            posts.value = json;
        } catch (e) {
            alert('Произошла ошибка при загрузке');
        } finally {
            isPostsLoading.value = false;
        }
    }
    
    onMounted(fetching);

    return {
        posts, isPostsLoading, totalPages
    }
}