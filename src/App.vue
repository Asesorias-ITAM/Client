<template>
  <div>
    <!-- <upper-bar/> -->
    <upper-bar_/>
    <router-view/>                                                                        
  </div>
    
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

export default {
  name: "App",
  components: {
    UpperBar: defineAsyncComponent(() => import("@/" + paths["UpperBar"])), //importa el componente dinámicamente
    UpperBar_: defineAsyncComponent(() => import("@/" + paths["UpperBar_"])), //importa el componente dinámicamente
  },
};
</script>

<style lang="scss">
html.dark {
  color-scheme: dark;
  @apply bg-fondo-general-dark;
  //@apply bg-verde-itam-1;
}

/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}*/

// .app {
// 	display: flex;
// 	main {
// 		flex: 1 1 0;
// 		padding: 2rem;
// 		@media (max-width: 1024px) {
// 			padding-left: 6rem;
// 		}
// 	}
// }


</style>
