import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css';

import "./assets/tailwind.css";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { markRaw } from 'vue'
// adapt this based on where your router is


const app = createApp(App);
const pinia = createPinia();

// Esta forma no funcionó
/*pinia.use((context) => {
    const storeID = context.store.$id
    //console.log(storeID)
    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    // sync store from local storage
    const fromStorage = serializer.deserialize(window.localStorage.getItem(storeID))
    //console.log(fromStorage)

    if(fromStorage) {
        context.store.$patch(fromStorage)
    }

    // listen and update local storage
    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeID, serializer.serialize(state))
    })
})*/

pinia.use(piniaPluginPersistedstate) // Nota: agregar persist:true en los métodos de la store si se usa este método

pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

app.use(pinia);
app.use(router);
app.mount("#app");
