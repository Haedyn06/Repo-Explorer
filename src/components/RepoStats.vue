<template>
    <div class="repo-stats">
        <ul>
            <li>
                <span><Star size="16" /> Stars</span>
                <p>{{ repo.stargazers_count || 'None' }}</p>
            </li>

            <li>
                <span><GitFork size="16" /> Forks</span>
                <p>{{ repo.forks_count || 'None' }}</p>
            </li>

            <li>
                <span><AlertCircle size="16" /> Issues</span>
                <p>{{ repo.open_issues_count || 'None' }}</p>
            </li>

            <li>
                <span><GitBranch size="16" /> Branch</span>
                <p>{{ repo.default_branch || 'N/A' }}</p>
            </li>

            <li>
                <span><Code size="16" /> Language</span>
                <p>{{ repo.language || 'N/A' }}</p>
            </li>

            <li>
                <span><Scale size="16" /> License</span>
                <p>{{ repo.license?.name || 'None' }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { Star, GitFork, AlertCircle, GitBranch, Code, Scale } from 'lucide-vue-next';

    defineProps({repo: Object});
</script>


<style scoped>
    .repo-stats ul {
        list-style: none;
        padding: 0;
        margin: 0;

        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .repo-stats li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;

        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid #334155;

        font-size: 15px;
        color: black;
        transition: all 0.2s ease;
    }

    .repo-stats li span {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .repo-stats li p {
        margin: 0;
    }

    .repo-stats li:hover {
        transform: translateY(-2px);
    }
</style>