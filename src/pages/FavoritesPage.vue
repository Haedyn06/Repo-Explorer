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
                    <button @click="previousPage" :disabled="page <= 1">
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
    import { ref, onMounted, watch } from 'vue';
    import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

    import { getFavorites } from '@/services/favoritesService.js';
    import '@/styles/FavoritesPage.css';
    import RepoCard from '@/components/RepoCard.vue';

    const pageNum = ref(1);

    const repos = ref([]);
    const totalItems = ref(0);
    const totalPages = ref(1);


    const loadFavorites = () => {
        const data = getFavorites();

        // Pagination
        const listAmnt = 5;

        const start = (pageNum.value - 1) * listAmnt;
        const end = start + listAmnt;

        repos.value = data.slice(start, end);
        totalItems.value = data.length;
        totalPages.value = Math.ceil(data.length / listAmnt);
    };

    const previousPage = () => {
        if (pageNum.value > 1) pageNum.value--;
    };

    const nextPage = () => {
        if (pageNum.value < totalPages.value) pageNum.value++;
    };


    onMounted(loadFavorites);
    watch(pageNum, loadFavorites);
</script>