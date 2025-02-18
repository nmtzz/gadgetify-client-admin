import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/demo",
      name: "demo",
      component: () => import("../ant-design-vue-demos/Demo.vue"),
    },
    {
      path: "/danh-muc",
      name: "about",
      component: () => import("../views/DanhMucView.vue"),
    },
    {
      path: "/san-pham",
      name: "san-pham",
      component: () => import("../views/SanPhamView.vue"),
    },
    {
      path: "/don-hang",
      name: "don-hang",
      component: () => import("../views/DonHangView.vue"),
    },
  ],
});
export default router;
