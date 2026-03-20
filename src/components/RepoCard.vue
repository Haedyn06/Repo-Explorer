<template>
        <button @click="goRepo" class="repo-card">
            <!-- Name + Star Count -->
            <div class="repo-top">
                <h1>{{ repo.name || 'N/A' }}</h1>

                <div class="repo-stars">
                    <span>{{ repo.stargazers_count || '0' }}</span>
                    <Star size="20" />
                </div>
            </div>

            <!-- User + About -->
            <div class="repo-middle">
                <h3>{{ repo.owner.login || 'N/A' }}</h3>
                <p>{{ trimDesc(repo.description) }}</p>
            </div>

            <!-- Last Update + Language -->
            <div class="repo-bottom">
                <p>Last Updated: {{ formatDate(repo.updated_at) }}</p>
                <p>{{ repo.language }}</p>
            </div>
        </button>
</template>



<script setup> 
    import { Star } from 'lucide-vue-next'
    import { useRouter } from 'vue-router';

    const props = defineProps({
        repo: { type: Object, required: true }
    });
    
    const router = useRouter();

    const goRepo = () => {
        router.push({ 
            name: 'repoDetails', 
            params: { owner: props.repo.owner.login, name: props.repo.name } 
        });
    }

    // Limit Amount of chracter in a description
    const trimDesc = (msg) => {
        const maxChar = 180

        if (!msg) return 'No Description';
        
        if (msg.length > maxChar) return msg.slice(0, maxChar) + '...';
        else return msg;

    }

    const formatDate = (date) =>  new Date(date).toLocaleDateString();
</script>




<style scoped>

    .repo-card {
        all: unset;
        padding: 1.5rem;
        border-radius: 14px;
        background: white;
        border: 1px solid black;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);

        transition: 0.2s ease;
    }

    .repo-card:hover {
        cursor: pointer;
        background: #f8fafc;
    }



    .repo-top, .repo-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .repo-stars {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
    }

    .repo-stars svg {
        position: relative;
        top: -1.5px;
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
    }


    .repo-bottom {
        margin-top: 3vh;
        color: rgb(69, 69, 69);
    }


    @media (max-width: 1100px) {
        .repo-top h1 {
            font-size: 25px;
        }
    }


</style>