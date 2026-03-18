<template>
    <section class="search-page">
    <h1 class="results-title">Results For: {{ $route.params.query }}</h1>

        <div class="result-container">
            <!-- Side Bar -->
            <aside class="side-bar">
                <div class="filter-container">
                    <div class="filter-block">
                        <h2>Filter</h2>
                    </div>

                    <div class="filter-block">
                        <h2>Sort By</h2>
                    </div>
                </div>
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
                        <RepoCardA v-for="repo in repos" :key="repo.id" :repo="repo" />
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
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { searchRepos } from '../services/githubService';
    import '@/styles/SearchPage.css'
    import RepoCardA from '@/components/RepoCardA.vue';

    const route = useRoute();
    
    const page = ref(1);
    const repos = ref([]);
    const loading = ref(false);
    const error = ref('');
    const hasSearched = ref(false);

    async function getRepos() {
        const searchTerm = route.params.query;
        
        if (!searchTerm?.trim()) {
            repos.value = [];
            hasSearched.value = false;
            return;
        }

        loading.value = true;
        error.value = '';
        hasSearched.value = true;

        try {
            const data = await searchRepos(searchTerm, page.value, 10);
            repos.value = data.items || [];
        } catch (err) {
            error.value = err.message;
            repos.value = [];
        } finally {
            loading.value = false;
        }
    }

    function previousPage() {
        if (page.value > 1) page.value--;
    }

    function nextPage() {
        if (hasSearched.value && repos.value.length < 10) return;
        page.value++;
    }

    watch(
        [() => route.params.query, page], 
        () => getRepos(),
        { immediate: true }
    );

    watch(
        () => route.params.query,
        () => { page.value = 1; }
    );
</script>
