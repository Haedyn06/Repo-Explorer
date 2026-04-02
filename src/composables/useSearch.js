import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useSearch() {
    const router = useRouter();
    const route = useRoute();
    const query = ref('');

    const handleSearch = () => {
        const trimmedQuery = query.value.trim();
        if (!trimmedQuery) return;

        router.push({ name: 'search', params: { query: trimmedQuery } });
    };

    watch(
        () => route.fullPath,
        () => query.value = ''
    );

    return { query, handleSearch };
}