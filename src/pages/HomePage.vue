<template>
    <section class="home-page">
        <div class="home-container">

            <!-- Title -->
            <div>
                <h1 class="home-title">GitHub Repository<br>Explorer</h1>
            </div>

            <!-- Search Bar -->
            <div class="search-box">
                <input v-model="query" type="text" placeholder="Explore GitHub Repositories" @keyup.enter="handleSearch" />
            </div>

            <!-- Search Results -->
            <div class="search-container">
                <p v-if="loading">Loading...</p>
                <p v-else-if="error">{{ error }}</p>
                <p v-else-if="hasSearched && repos.length === 0">No repositories found.</p>

                <div v-else class="repo-list">
                    <RepoCardA v-for="repo in repos" :key="repo.id" :repo="repo" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref } from 'vue';
    import { searchRepos } from '../services/githubService';

    import RepoCardA from '@/components/RepoCardA.vue';
    import '@/styles/HomePage.css';

    const query = ref('');
    const repos = ref([]);
    const loading = ref(false);
    const error = ref('');
    const hasSearched = ref(false);

    async function handleSearch() {
        if (!query.value.trim()) {
            repos.value = [];
            hasSearched.value = false;
            return;
        }

        loading.value = true;
        error.value = '';
        hasSearched.value = true;

        try {
            const data = await searchRepos(query.value, 1, 10);
            repos.value = data.items || [];
        } catch (err) {
            error.value = err.message;
            repos.value = [];
        } finally {
            loading.value = false;
        }
    }
</script>
