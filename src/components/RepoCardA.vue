<template>
        <button @click="goRepo" class="repo-card">
            <!-- Name + Star Count -->
            <div class="repo-top">
                <h1>{{ repo.name }}</h1>

                <p>{{ repo.stargazers_count }} ⭐</p>
            </div>

            <!-- User + About -->
            <div class="repo-middle">
                <h3>{{ repo.owner.login }}</h3>
                <p>{{ repo.description }}</p>
            </div>

            <!-- Last Update + Language -->
            <div class="repo-bottom">
                <p>Last Updated: {{ formatDate(repo.updated_at) }}</p>
                <p>{{ repo.language }}</p>
            </div>
        </button>
</template>



<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    repo: { type: Object, required: true }
});

const router = useRouter();

function goRepo() {
    router.push({ 
        name: 'repoDetails', 
        params: { owner: props.repo.owner.login, name: props.repo.name } 
    });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}
</script>




<style scoped>

.repo-card {
    all: unset;
    padding: 1.5rem;
    border-radius: 14px;
    background: white;
    border: 1px solid black;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);

    transition: background-color 0.3s ease;
}

.repo-card:hover {
    cursor: pointer;
    background-color: #f5f5f5;
}



.repo-top, .repo-bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
}


.repo-top p {
    margin-top: 10px;
    font-size: 2vh;
}


.repo-middle {
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.repo-middle h3 {
    margin-top: 0.5vh;
    font-weight: 300;
    color: rgb(69, 69, 69);
}

.repo-middle p {
    width: 80%;
    margin-left: 1%;
}


.repo-bottom {
    margin-top: 3vh;
    color: rgb(69, 69, 69);
}


</style>