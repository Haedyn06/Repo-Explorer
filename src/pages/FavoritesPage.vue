<template>
    <section class="favorites-page">
        <h1 class="favorites-title">{{ favorites.length }} Favorited Repositories</h1>

        <!-- Favorite Results -->
        <main class="list-container">
            <div>
                <p v-if="favorites.length === 0" class="state-text">
                    No favorite repositories found.
                </p>

                <div v-else class="repo-list">
                    <RepoCard v-for="repo in favorites" :key="repo.id" :repo="repo" />
                </div>
            </div>
        </main>
    </section>
</template>



<script setup>
    import { ref, onMounted } from 'vue';
    import { getFavorites } from '@/services/favoritesService.js';

    import '@/styles/FavoritesPage.css';

    import RepoCard from '@/components/RepoCard.vue';

    const favorites = ref([]);

    // Get list of favorites
    const loadFavorites = () => favorites.value = getFavorites();

    // Render
    onMounted(() => loadFavorites());
</script>