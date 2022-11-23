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
      import(/* webpackChunkName: "about" */ "@/" + paths["RegisterPage"]),
  },
  {
    path: "/confirmation",
    name: "Confirm",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/" + paths["ConfirmationPage"]),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/" + paths["HomePage"]),
      children: [
        {
          path: "my_tutors",
          name: "tutors",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/" + paths["TutorsPage"]),
          children:[
            
          ]
        },
        {
          path: "my_groups",
          name: "myGroups",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/" + paths["MyGroups"]),
          children:[
            
          ]
        },
        {
          path: "search",
          name: "Search Groups",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/" + paths["SearchGroupsPage"]),
          children:[
            
          ]
        },
        {
          path: ":id",
          name: "GroupPage",
          component: () =>
            import(/* webpackChunkName: "about" */ "@/" + paths["GroupPage"]),
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
            import(/* webpackChunkName: "about" */ "@/" + paths["PublishPage"]),
        },
      ],
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/" + paths["AdminLoginPage"]),
  },
  {
    path: "/admin_home",
    name: "Admin Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/" + paths["AdminHomePage"]),
    children: [
      {
        path:"Directorio", 
        component: () =>
          import(/* webpackChunkName: "about" */ "@/" + paths["DirectorioPage"])
      },
      {
        path:"Publicaciones", 
        component: () =>
          import(/* webpackChunkName: "about" */ "@/" + paths["PublicacionesPage"])
      }
    ],
  },    
  {
    // Cualquier otra URL se redirecciona a esta página
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/" + paths["NotFoundPage"])
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export { routes } // Las rutas individuales son usadas en los tests

export default router;
