import { createRouter, createWebHistory } from "vue-router"
import Virtualization from "@/views/pages/Virtualization.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "virtualization",
      component: Virtualization
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/"
    }
  ]
})

export default router
