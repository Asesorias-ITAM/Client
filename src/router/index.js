import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/RegisterPage.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/HomePage.vue"),
  },
  {
    path: "/confirmation",
    name: "Confirm",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/ConfirmationPage.vue"),
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/AdminLoginPage.vue"),
  },
  {
    path: "/dashboard",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Dashboard/AdminPage.vue"),
    children: [
      {path:"directorio", 
      component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Dashboard/DirectorioPage.vue")},
      {path:"publicaciones", 
      component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Dashboard/PublicacionesPage.vue")}
    ],
  },    
  {
    // Cualquier otra URL se redirecciona a esta página
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export { routes } // Las rutas individuales son usadas en los tests

export default router;
