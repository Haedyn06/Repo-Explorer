import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import SearchResultsPage from '@/pages/SearchResultsPage.vue';
import RepoDetailsPage from '@/pages/RepoDetailsPage.vue';
import FavoritesPage from '@/pages/FavoritesPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/search=:query', name: 'search', component: SearchResultsPage},
    { path: '/favorites', component: FavoritesPage },
    { path: '/repo/:owner/:name', name: 'repoDetails', component: RepoDetailsPage },
    { path: '/:pathMatch(.*)*', component: NotFoundPage }
  ]
})

export default router