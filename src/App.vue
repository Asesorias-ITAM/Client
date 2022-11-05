<template>
  <div>
    <upper-bar/>
    <router-view/>                                                                        
  </div>
    
</template>
<script>
import UpperBar from "@/components/UpperBar.vue";
export default {
  name: "App",
  components: {
    UpperBar,
  },
};
</script>
<style scoped>
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
</style>
