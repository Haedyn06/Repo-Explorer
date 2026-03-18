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
    import { useRouter } from 'vue-router'

    import '@/styles/HomePage.css';

    const router = useRouter()
    const query = ref('')

    function handleSearch() {
        if (!query.value.trim()) return
        router.push({ name: 'search', params: { query: query.value.trim() } })
    }
</script>
