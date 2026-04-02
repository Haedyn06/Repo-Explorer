<template>
    <button @click="goBack" class="back-btn">
        <ArrowLeft size="25" />
        <h1>Back</h1>
    </button>

    <p v-if="loading" class="state-text">Loading Repository..</p>
    <p v-else-if="error" class="state-text">{{ error }}</p>

    <main v-if="repo" class="repo">
        <!-- Main Details -->
        <div class="repo-details">
            <div class="repo-header">
                <div class="repo-title">
                    <h1>{{ name }}</h1>
                    <p class="repo-owner">by {{ owner }}</p>
                </div>
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
                <p>{{ repo.description || 'No Description' }}</p>
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
    import { ArrowLeft } from 'lucide-vue-next';
    import { useRoute } from 'vue-router';

    import '@/styles/RepoDetailsPage.css';

    import RepoStats from '@/components/RepoStats.vue';
    import RepoContributors from '@/components/RepoContributors.vue';

    import { useRepoDetails } from '@/composables/RepoDetailsPage';
    const route = useRoute();

    const owner = route.params.owner;
    const name = route.params.name;

    const { repo, loading, error, favorite, toggleFavorite, goBack, formattedUpdateDate, formattedCreationDate } = 
        useRepoDetails(owner, name);
        
</script>