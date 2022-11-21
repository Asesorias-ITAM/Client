<template>
    <div class="home">
        <aside class="flex flex-auto flex-col h-full overflow-hidden p-4 bg-verde-itam-2">
            <section class="menu pt-2">
                <MenuButton text="Directorio" img="contacts.svg" destination="/admin_home/directorio" :type="path==='/admin_home/directorio' ? 'pressed' : 'unPressed'"/>
                <MenuButton text="Publicaciones" img="description.svg" destination="/admin_home/publicaciones" :type="path==='/admin_home/publicaciones' ? 'pressed' : 'unPressed'"/>
            </section>

            <!-- Agrega espacio entre Cerrar Sesión y los demás botones -->
            <div class="flex"></div>

            <section class="menu">
                <MenuButton text="Cerrar sesión" img="logout.svg" type="unPressed" @click="logout"/>
            </section>
        </aside>

        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useAdminStore } from '@/stores/admin.js'
import { useRouter,useRoute } from "vue-router"

export default {
    name: "AdminHomePage",
    components: { 
        MenuButton: defineAsyncComponent(() => import("@/" + paths["MenuButton"])), 
        RouterButton: defineAsyncComponent(() => import("@/" + paths["RouterButton"])), 
    },
    setup(){
        const router = useRouter();
        const store = useAdminStore()
        const route = useRoute();
        
        return {
            // you can return the whole store instance to use it in the template
            store,
            router,
            route,
            
        }
    },
    beforeCreate(){
        if (this.store.session === null){
            router.replace({
                name: "AdminLogin",
            });
        }
    }, 
    data(){
        return {
            btnPresionado: "",
            
        }
    },
    computed: {
        path(){
            return this.route.path
        }
    },
    methods: {
        test(){
            console.log(this.path)
        },  
        logout(){
            this.store.logout(); 
            this.store.$reset()
            console.log(this.store.session)
            this.router.replace({
                name: "AdminLogin",
            });
        }
    }
}

</script>

<style lang="scss" scoped>
.home {
    display: flex;

    .content {
        flex: 1 1 auto;
		//padding: 2rem;
    }
}

aside {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
    width: 13.5rem; //width: calc(13rem);// + 32px);
    min-width: 13.5rem;
    max-width: 13.5rem;
    height: 100%;
    min-height: 90vh; // TODO: hacer esto dinámico con flexbox

    .flex {
		flex: 0.9 1 auto;
	}

    .menu {
		margin: 0 -1rem;
        font-size: 1.4rem; /* 24px */
        line-height: 1.9rem; /* 32px */
    }
}
</style>