<template>
    <button @click="goBack" class="back-btn">
        <ArrowLeft size="25" />
        <h1>Back To Search</h1>
    </button>

    <p v-if="loading" class="state-text">Loading Repository..</p>
    <p v-else-if="error" class="state-text">{{ error }}</p>

    <main v-if="repo" class="repo">
        <!-- Main Details -->
        <div class="repo-details">
            <div class="repo-header">
                <h1>{{ name }} - {{ owner }}</h1>
                <button class="fav-btn" @click="toggleFavorite" :class="{ active: favorite }">
                    <p>{{ favorite ? 'Unfavorite' : 'Favorite' }}</p>
                </button>
            </div>

            <div class="repo-dates">
                <p>Last Updated: {{ formattedUpdateDate() || 'N/A' }}</p>
                <p>Created: {{ formattedCreationDate() || 'N/A' }}</p>
            </div>

            <div class="repo-desc">
                <h3>Description</h3>
                <p>{{ repo.description || '[No Description]' }}</p>
            </div>

            <div class="repo-actions">
                <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="url-btn" >
                    View On GitHub
                </a>
            </div>
        </div>

        <!-- Extra Info -->
        <div class="repo-extra">
            <!-- Stats -->
            <RepoStats :repo="repo" />
            <!-- Contributions -->
            <RepoContributors :owner="owner" :repo="name" />

        </div>
    </main>
</template>



<script setup>
    // Imports
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { ArrowLeft } from 'lucide-vue-next';
    
    import { getRepo } from '@/services/githubService';
    import { addToFavorites, removeFromFavorites, isFavorite } from '@/services/favoritesService.js';

    import '@/styles/RepoDetailsPage.css';

    import RepoStats from '@/components/RepoStats.vue';
    import RepoContributors from '@/components/RepoContributors.vue';

    // Vars
    const route = useRoute();
    const router = useRouter();
    
    const owner = route.params.owner;
    const name = route.params.name;
    
    const repo = ref(null);
    const loading = ref(false);
    const error = ref('');

    const favorite = ref(false);

    // Methods
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

    const goBack = () => router.back();

    const formattedUpdateDate = (timeZone = 'UTC') => {
        const date = new Date(repo.value.updated_at);

        return date.toLocaleString('en-US', {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: timeZone
        }) + ' ' + timeZone;
    }

    const formattedCreationDate = () => 
        new Date(repo.value.created_at).toLocaleDateString();


    function toggleFavorite() {
        if (!repo.value) return;

        if (favorite.value) {
            removeFromFavorites(repo.value.id);
            favorite.value = false;
        } else {
            addToFavorites(repo.value);
            favorite.value = true;
        }
    }

    // Render
    onMounted(() => handleRepo());

</script>