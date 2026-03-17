<template>
    <div>
        <nav class="nav">
            <div class="nav-btns">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/favorites">Favourites</RouterLink>
            </div>

            <div class="nav-search">
                <input v-model="query" type="text" placeholder="Search Repositories" @keyup.enter="handleSearch" />
                <span class="search-icon">🔍</span>
            </div>
        </nav>
    </div>
</template>


<script setup>
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    import { ref } from 'vue';
    
    const query = ref('');

    function handleSearch() {
        router.push({ name: 'search', params: { query: query.value } });
    }
</script>


<style scoped>


.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.8rem 2rem;
    background: #020617;
    border-bottom: 2px solid #222;
}

.nav-btns {
    display: flex;
    gap: 2rem;
}

.nav-btns a {
    position: relative;
    text-decoration: none;
    color: white;
    font-size: 2.2vh;
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

.nav-btns a:hover::after {
    width: 100%;
}

.nav-search {
    position: relative;
    width: 20%;

}

.nav-search input {
    padding: 0.4rem 2rem 0.4rem 1rem;
    border-radius: 999px;
    border: none;
    outline: none;
    height: 4vh;
    width: 100%;
    font-size: 1.8vh;
}

.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}

</style>