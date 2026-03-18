<!-- TO DO: -->
<!-- 
    - Display Contributions
        - Top 3 or 5 Contributors
        - Show More Contributors

    - Make "Back To Search" Button Functional
        - Go Back To Searched Query

    - Display Message When Certain Criterias Are Empty
-->

<template>
    <button class="back-btn">
        <ArrowLeft size="25" />
        <h1>Back To Search</h1>
    </button>
    <main v-if="repo" class="repo">
        <!-- Main Details -->
        <div class="repo-details">
            <div class="repo-header">
                <h1>{{ name }} - {{ owner }}</h1>
                <button class="fav-btn">
                    <p>Favorite</p>
                </button>
            </div>

            <div class="repo-dates">
                <p>Last Updated: {{ formattedUpdateDate() }}</p>
                <p>Created: {{ formattedCreationDate() }}</p>
            </div>

            <div class="repo-desc">
                <h3>Description</h3>
                <p>{{ repo.description }}</p>
            </div>

            <div class="repo-actions">
                <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="github-btn" >
                    View On GitHub
                </a>
            </div>
        </div>

        <!-- Extra Info -->
        <div class="repo-extra">

            <!-- Contributions -->
            <div class="repo-contributors">
                <h2 style="text-align: center;">Top Contributors</h2>
                
            </div>

            <!-- Stats -->
            <div class="repo-stats">
                <ul>
                    <li>
                        <span><Star size="16" /> Stars</span>
                        <p>{{ repo.stargazers_count }}</p>
                    </li>

                    <li>
                        <span><GitFork size="16" /> Forks</span>
                        <p>{{ repo.forks_count }}</p>
                    </li>

                    <li>
                        <span><AlertCircle size="16" /> Issues</span>
                        <p>{{ repo.open_issues_count }}</p>
                    </li>

                    <li>
                        <span><GitBranch size="16" /> Branch</span>
                        <p>{{ repo.default_branch }}</p>
                    </li>

                    <li>
                        <span><Code size="16" /> Language</span>
                        <p>{{ repo.language || 'None' }}</p>
                    </li>

                    <li>
                        <span><Scale size="16" /> License</span>
                        <p>{{ repo.license?.name || 'None' }}</p>
                    </li>
                </ul>


            </div>
        </div>


    </main>



</template>



<script setup>
    import { Star, GitFork, AlertCircle, GitBranch, Code, Scale, ArrowLeft } from 'lucide-vue-next';
    import { getRepo } from '@/services/githubService';
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import '@/styles/RepoDetailsPage.css';

    const route = useRoute();
    
    const owner = route.params.owner;
    const name = route.params.name;

    const repo = ref(null);
    const loading = ref(false);
    const error = ref('');

    async function handleRepo() {
        try {
            const data = await getRepo(owner, name);
            repo.value = data || null;
        } catch (err) {
            error.value = err.message;
            repo.value = null;
        } finally {
            loading.value = false;
        }
    }


    function formattedUpdateDate(timeZone = 'UTC') {
        const date = new Date(repo.value.updated_at);

        return date.toLocaleString('en-US', {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: timeZone
        }) + ' ' + timeZone;
    }

    function formattedCreationDate() {
        return new Date(repo.value.created_at).toLocaleDateString();
    }





    handleRepo();

</script>