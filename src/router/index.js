import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/danh-muc',
            name: 'about',
            component: () => import('../views/DanhMucView.vue'),
        },
    ],
})
// router.beforeEach((to, from, next) => {
//     const loading = useLoadingStore();
//     loading.show();
//     next();
// })
// router.afterEach(() => {
//     const loading = useLoadingStore();
//     loading.hide();
// })
// router.onError((error) => {
//     const loading = useLoadingStore();
//     loading.hide();
//     console.error(error);
// })
export default router
