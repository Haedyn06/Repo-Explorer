<template>
    <section class="favorites-page">
        <h1 class="favorites-title">{{ totalItems }} Favorited Repositories</h1>

        <main class="list-container">
            <div>
                <p v-if="repos.length === 0" class="state-text">
                    No Repositories Favorited.
                </p>

                <div v-else class="repo-list">
                    <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
                </div>

                <div class="paginate">
                    <button @click="previousPage" :disabled="pageNum <= 1">
                        <ChevronLeft size="20" />
                    </button>

                    <p>Page {{ pageNum }}</p>

                    <button @click="nextPage">
                        <ChevronRight size="20" />
                    </button>
                </div>
            </div>
        </main>
    </section>
</template>


<script setup>
    import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

    import '@/styles/FavoritesPage.css';

    import RepoCard from '@/components/RepoCard.vue';
    import { useFavoritesRepos } from '@/composables/FavoritesPage';

    const { pageNum, repos, totalItems, previousPage, nextPage } = useFavoritesRepos(5);
</script>