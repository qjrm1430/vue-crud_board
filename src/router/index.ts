import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ListPage from "@/pages/ListPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: ListPage,
  },
  {
    path: "/write",
    name: "write",
    component: () => import("@/pages/WritePage.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/pages/PostPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
