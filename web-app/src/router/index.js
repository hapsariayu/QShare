import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AddOrder from "../views/AddOrder.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/AddOrder",
      name: "AddOrder",
      component: AddOrder,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/regist",
      name: "Regist",
      component: RegisterPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token;
  if ((to.name === "home" || to.name === "AddOrder") && !isAuthenticated) {
    next({ name: "Login" });
  } else if ((to.name === "Login" || to.name === "Regist") && isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
