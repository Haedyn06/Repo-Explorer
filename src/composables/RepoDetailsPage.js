import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { getRepo } from '@/services/githubService';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/services/favoritesService.js';

export function useRepoDetails(owner, name) {
    const router = useRouter();

    const repo = ref(null);
    const loading = ref(false);
    const error = ref('');
    const favorite = ref(false);


    async function handleRepo() {
        loading.value = true;
        error.value = '';

        try {
            const repoData = await getRepo(owner, name);
            repo.value = repoData || null;

            if (repo.value) favorite.value = isFavorite(repo.value.id);
        } catch (err) {
            error.value = err.message;
            repo.value = null;
        } finally {
            loading.value = false;
        }
    }

    const toggleFavorite = () => {
        if (!repo.value) return;

        if (favorite.value) {
            removeFromFavorites(repo.value.id);
            favorite.value = false;
        } else {
            addToFavorites(repo.value);
            favorite.value = true;
        }
    };

    const goBack = () => router.back();

    const formattedUpdateDate = (timeZone = 'UTC') => {
        const date = new Date(repo.value.updated_at);

        return date.toLocaleString('en-US', {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: timeZone
        }) + ' ' + timeZone;
    }

    const formattedCreationDate = () => {
        if (!repo.value?.created_at) return '';
        return new Date(repo.value.created_at).toLocaleDateString();
    };

    onMounted(handleRepo);

    return { repo, loading, error, favorite, handleRepo, toggleFavorite, goBack, formattedUpdateDate, formattedCreationDate };
}