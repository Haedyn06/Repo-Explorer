import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { searchRepos } from '@/services/githubService';

export function useSearchRepos(listAmnt = 10) {
    const route = useRoute();

    const totalResults = ref(0);
    const pageNum = ref(1);

    const repos = ref([]);
    const loading = ref(false);
    const error = ref('');
    const searched = ref(false);

    const sortBy = ref('byRelevance');
    const filterLang = ref('');

    async function getRepos() {
        const searchTerm = route.params.query;

        // Check Existance
        if (!searchTerm?.trim()) {
            repos.value = [];
            totalResults.value = 0;
            searched.value = false;
            error.value = '';
            return;
        }

        loading.value = true;
        error.value = '';
        searched.value = true;

        // Get list of repositories depending on the condition
        try {
            const data = await searchRepos(searchTerm, pageNum.value, listAmnt, sortBy.value, filterLang.value);

            repos.value = data.items || [];
            totalResults.value = data.total_count || 0;
        } catch (err) {
            error.value = err.message;
            repos.value = [];
            totalResults.value = 0;
        } finally {
            loading.value = false;
        }
    }

    // Pagination
    const previousPage = () => {
        if (pageNum.value > 1) pageNum.value--;
    };

    const nextPage = () => {
        if (searched.value && repos.value.length < listAmnt) return;
        pageNum.value++;
    };



    watch(
        [() => route.params.query, pageNum, sortBy, filterLang],
        getRepos,
        { immediate: true }
    );

    watch(() => route.params.query, () => {
        pageNum.value = 1;
    });

    watch([sortBy, filterLang], () => pageNum.value = 1);

    
    return { totalResults, pageNum, repos, loading, error, searched, sortBy, filterLang, previousPage, nextPage, getRepos };
}