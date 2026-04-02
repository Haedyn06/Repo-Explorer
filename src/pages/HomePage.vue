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
    import '@/styles/HomePage.css';
    import { useSearch } from '@/composables/useSearch';

    const { query, handleSearch } = useSearch();
</script>
