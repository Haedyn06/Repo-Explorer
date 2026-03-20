<template>
    <section class="home-page">
        <div class="home-container">

            <!-- Title -->
            <div>
                <h1 class="home-title">GitHub Repository<br>Explorer</h1>
            </div>

            <!-- Search Bar -->
            <div class="search-box">
                <input v-model="query" type="text" placeholder="Explore Repositories" @keyup.enter="handleSearch" />
            </div>
        </div>
    </section>
</template>



<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'

    import '@/styles/HomePage.css';

    const router = useRouter()
    const query = ref('')

    function handleSearch() {
        if (!query.value.trim()) return
        router.push({ name: 'search', params: { query: query.value.trim() } })
    }
</script>
