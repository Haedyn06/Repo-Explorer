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
                    
                    <p v-else-if="hasSearched && repos.length === 0" class="state-text" >
                        No repositories found.
                    </p>

                    <div v-else class="repo-list">
                        <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
                    </div>
                </div>

                <div class="list-page">
                    <button @click="previousPage" :disabled="page <= 1">
                        <ChevronLeft size="20" />
                    </button>

                    <p>Page {{ page }}</p>

                    <button @click="nextPage">
                        <ChevronRight size="20" />
                    </button>
                </div>
            </main>
        </div>
    </section>
</template>


<script setup>
    // Imports
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

    import { searchRepos } from '../services/githubService';
    
    import '@/styles/SearchPage.css'
    
    import RepoCard from '@/components/RepoCard.vue';
    import SortRepos from '@/components/SortRepos.vue';
    import FilterRepos from '@/components/FilterRepos.vue';

    // Vars
    const route = useRoute();
    
    const page = ref(1);
    const repos = ref([]);
    const loading = ref(false);
    const error = ref('');
    const hasSearched = ref(false);
    
    const sortBy = ref('byRelevance');
    const filterLang = ref('');
    const totalResults = ref(0);

    // Methods
    async function getRepos() {
        const searchTerm = route.params.query;
        
        // Check Existance
        if (!searchTerm?.trim()) {
            repos.value = [];
            hasSearched.value = false;
            return;
        }

        loading.value = true;
        error.value = '';
        hasSearched.value = true;
        
        // Get list of repositories depending on the condition
        try {
            const data = await searchRepos(searchTerm, page.value, 10, sortBy.value, filterLang.value);
            repos.value = data.items || [];
            totalResults.value = data.total_count;
        } catch (err) {
            error.value = err.message;
            repos.value = [];
        } finally {
            loading.value = false;
        }
    }

    const previousPage = () => {
        if (page.value > 1) page.value--;
    }

    const nextPage = () => {
        if (hasSearched.value && repos.value.length < 10) return;
        page.value++;
    }



    // Render
    watch(
        [() => route.params.query, page, sortBy, filterLang], 
        () => getRepos(),
        { immediate: true }
    );

    watch(
        () => route.params.query,
        () => { page.value = 1; }
    );

    watch([sortBy, filterLang], () => page.value = 1);
</script>