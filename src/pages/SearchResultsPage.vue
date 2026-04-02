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
    import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

    import '@/styles/SearchResultsPage.css';

    import RepoCard from '@/components/RepoCard.vue';
    import SortRepos from '@/components/SortRepos.vue';
    import FilterRepos from '@/components/FilterRepos.vue';

    import { useSearchRepos } from '@/composables/SearchResultsPage';

    const { totalResults, pageNum, repos, loading, error, searched, sortBy, filterLang, previousPage, nextPage } = useSearchRepos(10);
</script>