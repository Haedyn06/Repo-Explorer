import { ref, onMounted, watch } from 'vue';
import { getFavorites } from '@/services/favoritesService.js';

export function useFavoritesRepos(listAmnt = 5) {
    const pageNum = ref(1);

    const repos = ref([]);
    const totalItems = ref(0);
    const totalPages = ref(1);

    const loadFavorites = () => {
        const data = getFavorites();

        const start = (pageNum.value - 1) * listAmnt;
        const end = start + listAmnt;

        repos.value = data.slice(start, end);
        totalItems.value = data.length;
        totalPages.value = Math.ceil(data.length / listAmnt) || 1;
    };

    const previousPage = () => {
        if (pageNum.value > 1) pageNum.value--;
    };

    const nextPage = () => {
        if (pageNum.value < totalPages.value) pageNum.value++;
    };

    onMounted(loadFavorites);
    watch(pageNum, loadFavorites);

    return { pageNum, repos, totalItems, totalPages, previousPage, nextPage, loadFavorites };
}