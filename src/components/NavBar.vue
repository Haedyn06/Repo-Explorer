<template>
    <nav class="nav">
        <div class="nav-btns">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/favorites">Favorites</RouterLink>
        </div>

        <div class="nav-search">
            <input v-model="query" type="text" placeholder="Search Repositories" @keyup.enter="handleSearch" />
        </div>
    </nav>
</template>



<script setup>
    // Imports
    import { RouterLink, useRouter } from 'vue-router'
    import { ref } from 'vue'

    // Vars
    const router = useRouter()
    const query = ref('')

    // Methods
    function handleSearch() {
        if (!query.value.trim()) return
        router.push({ name: 'search', params: { query: query.value.trim() } })
    }
</script>



<style scoped>
    * {
        box-sizing: border-box;
    }

    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;

        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 60px;
        padding: 0 2rem;
        background: #020617;
        border-bottom: 2px solid #222;
    }

    .nav-btns {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .nav-btns a {
        position: relative;
        text-decoration: none;
        color: white;
        font-size: 20px;
        font-weight: 500;
    }

    .nav-btns a::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s ease;
    }

    .nav-btns a:hover::after, .nav-btns a.router-link-active::after { width: 100%; }

    .nav-search {
        position: relative;
        width: 320px;
        max-width: 40%;
    }

    .nav-search input {
        width: 100%;
        height: 35px;
        padding: 0 2.5rem 0 1rem;
        border: none;
        outline: none;
        border-radius: 100px;
        font-size: 16px;
    }

    .search-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        pointer-events: none;
    }

    @media (max-width: 768px) {
        .nav {
            padding: 0 1rem;
            gap: 1rem;
        }

        .nav-btns {
            gap: 1rem;
        }

        .nav-btns a {
            font-size: 16px;
        }

        .nav-search {
            width: 200px;
            max-width: 50%;
        }
    }
</style>