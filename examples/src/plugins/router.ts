import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/foo', component: () => import('~/routes/foo/Registry.vue') },
    { path: '/bar', component: () => import('~/routes/bar/Registry.vue') },
    { path: '/baz', component: () => import('~/routes/baz/Registry.vue') },
  ],
});
