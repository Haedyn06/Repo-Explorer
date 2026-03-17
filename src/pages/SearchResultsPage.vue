<template>
    <!-- <div>{{ $route.params.query }}</div> -->
        
    <section>
        <h1 style="color: black;">Results For: {{$route.params.query}}</h1>

        <div class="result-container">
            
            <!-- Filters + Sort By -->
            <div class="filters-container">
                <h1>Filter</h1>
                <div>

                </div>

                <h1>Sort By</h1>
                <div>
                    
                </div>

            </div>


            <!-- Search Results -->
            <div class="repos-container">
                <div>
                    <p v-if="loading" style="text-align: center;">Loading...</p>
                    <p v-else-if="error" style="text-align: center;">{{ error }}</p>
                    <p 
                        v-else-if="hasSearched && repos.length === 0"
                        style="text-align: center;"
                    >
                        No repositories found.
                    </p>

                    <div v-else class="repo-list">
                            <RepoCardA v-for="repo in repos" :key="repo.id" :repo="repo" />
                    </div>
                </div>

                <div class="list-page">
                    <button @click="previousPage" :disabled="page <= 1">←</button>
                    <p>Page {{ page }}</p>
                    <button @click="nextPage">→</button>
                </div>
            </div>
        </div>




    </section>

</template>


<script setup>
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
