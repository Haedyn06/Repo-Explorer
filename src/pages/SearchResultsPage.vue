<template>
    <section class="search-page">
    <h1 class="results-title">{{totalResults}} results for "{{ $route.params.query }}"</h1>

        <div class="result-container">
            <!-- Side Bar -->
             <aside class="side-bar">
                <SortRepos v-model="sortBy" />
                <FilterRepos v-model="filterLang" />


             </aside>

            <!-- Search Results -->
            <main class="list-container">
                <div>
                    <p v-if="loading" class="state-text">Loading...</p>
                    <p v-else-if="error" class="state-text">{{ error }}</p>
                    
                    <p v-else-if="searched && repos.length === 0" class="state-text" >
                        No Results
                    </p>

                    <div v-else class="repo-list">
                        <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
                    </div>
                </div>

                <!-- Pagination -->
                <div class="paginate">
                    <button @click="previousPage">
                        <ChevronLeft size="20" />
                    </button>

                    <p>Page {{ pageNum }}</p>

                    <button @click="nextPage">
                        <ChevronRight size="20" />
                    </button>
                </div>
            </main>
        </div>
    </section>
</template>


<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

    import { searchRepos } from '../services/githubService';
    
    import '@/styles/SearchResultsPage.css'
    
    import RepoCard from '@/components/RepoCard.vue';
    import SortRepos from '@/components/SortRepos.vue';
    import FilterRepos from '@/components/FilterRepos.vue';


    const route = useRoute();
    
    const totalResults = ref(0);
    const pageNum = ref(1);
    const listAmnt = 10;

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
            searched.value = false;
            return;
        }

        loading.value = true;
        error.value = '';
        searched.value = true;
        
        // Get list of repositories depending on the condition
        try {
            const data = await searchRepos(searchTerm, pageNum.value, listAmnt, sortBy.value, filterLang.value);
            repos.value = data.items || [];
            totalResults.value = data.total_count;
        } catch (err) {
            error.value = err.message;
            repos.value = [];
        } finally {
            loading.value = false;
        }
    }

    // Pagination
    const previousPage = () => {
        if (pageNum.value > 1) pageNum.value--;
    }

    const nextPage = () => {
        if (searched.value && repos.value.length < listAmnt) return;
        pageNum.value++;
    }



    // Render
    watch(
        [() => route.params.query, pageNum, sortBy, filterLang], 
        () => getRepos(),
        { immediate: true }
    );

    watch(
        () => route.params.query,
        () => { pageNum.value = 1; }
    );

    watch([sortBy, filterLang], () => pageNum.value = 1);
</script>