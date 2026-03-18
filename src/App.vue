<template>
    <NavBar />

    <div style="padding: 2rem; padding-top: 5rem;" >
      <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import NavBar from '@/components/NavBar.vue';

</script>