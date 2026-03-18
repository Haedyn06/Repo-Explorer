<template>
    <section class="favorites-page">
        <h1 class="favorites-title">Favorite Repositories</h1>

        <div class="favorites-container">
            <!-- Side Bar -->
            <aside class="side-bar">
                <div class="side-container">
                    <div class="side-block">
                        <h2>Favorites</h2>
                        <p>{{ favorites.length }} saved</p>
                    </div>
                </div>
            </aside>

            <!-- Favorite Results -->
            <main class="list-container">
                <div>
                    <p v-if="favorites.length === 0" class="state-text">
                        No favorite repositories found.
                    </p>

                    <div v-else class="repo-list">
                        <RepoCardA v-for="repo in favorites" :key="repo.id" :repo="repo" />
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>



<script setup>
    import { ref, onMounted } from 'vue';
    import { getFavorites } from '@/services/favoritesService.js';

    import '@/styles/FavoritesPage.css';

    import RepoCardA from '@/components/RepoCardA.vue';

    const favorites = ref([]);

    const loadFavorites = () => favorites.value = getFavorites();

    // Render
    onMounted(() => loadFavorites());
</script>