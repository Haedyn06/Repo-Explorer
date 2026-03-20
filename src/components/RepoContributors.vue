<template>
    <div class="repo-contributors">
        <h2 style="text-align: center;">Top Contributors</h2>

        <p v-if="error" class="state-text">{{ error }}</p>

        <p v-else-if="contributors.length === 0" class="state-text">No contributors found.</p>

        <!-- List -->
        <ul v-else-if="!error" class="contributors-list">
            <li v-for="contributor in visibleContributors" :key="contributor.id" class="contributor-item">
                <img :src="contributor.avatar_url" :alt="contributor.login" class="contributor-avatar" />

                <div class="contributor-info">
                    <a :href="contributor.html_url" target="_blank">{{ contributor.login }}</a>
                    <p>{{ contributor.contributions }} contributions</p>
                </div>
            </li>
        </ul>

        <!-- Load More -->
        <button v-if="contributors.length > visAmnt" @click="toggle" class="contributors-btn">
            {{ showAll ? 'Show Less' : `View ${contributors.length - visAmnt}+ More` }}
        </button>
    </div>
</template>



<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { getContributors } from '@/services/githubService';

    const props = defineProps({ owner: String, repo: String });

    const contributors = ref([]);
    const showAll = ref(false);
    const visAmnt = 3;
    const error = ref('');

    async function loadContributors() {
        try {
            const data = await getContributors(props.owner, props.repo);
            contributors.value = data || [];
        } catch (err) {
            error.value = err.message;
            contributors.value = [];
        }
    }

    const visibleContributors = computed(() => {
        return showAll.value ? contributors.value : contributors.value.slice(0, visAmnt);
    });

    const toggle = () => showAll.value = !showAll.value; // toggle contributions

    onMounted(() => loadContributors());
</script>



<style scoped>
    .repo-contributors {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
        border: 1px solid black;
        border-radius: 18px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    }

    .contributors-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .contributor-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border: 1px solid black;
        border-radius: 12px;
        transition: 0.2s ease;
    }

    .contributor-item:hover {
        background: #f8fafc;
    }

    .contributor-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
    }

    .contributor-info {
        display: flex;
        flex-direction: column;
    }

    .contributor-info a {
        font-weight: 600;
        text-decoration: none;
        color: #0f172a;
        transition: 0.2s;
    }

    .contributor-info a:hover {
        color: #3b82f6;
    }

    .contributor-info p {
        margin: 2px 0 0 0;
        font-size: 0.85rem;
        color: #64748b;
    }

    .contributors-btn {
        align-self: center;
        padding: 10px 16px;
        border-radius: 12px;
        border: 1px solid black;
        cursor: pointer;
        font-size: 0.9rem;
        transition: 0.2s ease;
    }

    .contributors-btn:hover {
        background: #0f172a;
        color: white;
    }
</style>