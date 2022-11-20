import { createRouter, createWebHashHistory } from "vue-router";
import paths from "@/file_paths.js"

const routes = [
  {
    path: "/",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/" + paths["LoginPage"]),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("@/" + paths["RegisterPage"]),
  },
  {
    path: "/confirmation",
    name: "Confirm",
    component: () =>
      import("@/" + paths["ConfirmationPage"]),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import("@/" + paths["HomePage"]),
      children: [
        {
          path: "search",
          name: "Search Groups",
          component: () =>
            import("@/" + paths["SearchGroupsPage"]),
        },
        /*{
          path: "student_groups",
          name: "Student Groups",
          component: () =>
            import("@/views/StudentGroupPage.vue"),
        },*/
        {
          path: "publish_group",
          name: "Publish group",
          component: () =>
            import("@/" + paths["PublishGroupPage"]),
        },
      ],
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: () =>
      import("@/" + paths["AdminLoginPage"]),
  },
  {
    path: "/admin_home",
    name: "Admin Home",
    component: () =>
      import("@/" + paths["AdminPage"]),
    children: [
      {
        path:"Directorio", 
        component: () =>
          import("@/" + paths["DirectorioPage"])
      },
      {
        path:"Publicaciones", 
        component: () =>
          import("@/" + paths["PublicacionesPage"])
      }
    ],
  },    
  {
    // Cualquier otra URL se redirecciona a esta página
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import("@/" + paths["NotFoundPage"])
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export { routes } // Las rutas individuales son usadas en los tests

export default router;
