export const postModule = {
    namespaced: true,
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort(((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
            }));
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        }, 
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        removePost(state, post) {
            state.posts = state.posts.filter(p => p.id !== post.id);
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            commit('setLoading', true);
 
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`);
                const json = await response.json();

                commit('setTotalPages', Math.ceil(response.headers.get('x-total-count') / state.limit));
                commit('setPosts', json);

            } catch (e) {
                alert('Произошла ошибка при загрузке');
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) { 
            try {
                commit('setPage', state.page + 1);
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`);
                const json = await response.json();

                commit('setTotalPages', Math.ceil(response.headers.get('x-total-count') / state.limit));
                commit('setPosts', [...state.posts, ...json]);

            } catch (e) {
                alert('Произошла ошибка при загрузке');
            }
        }
    }
}