import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/foo', component: () => import('~/routes/foo/Registry.vue') },
    { path: '/bar', component: () => import('~/routes/bar/Registry.vue') },
  ],
});
