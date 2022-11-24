<template>
    <div class="home">
        <aside class="flex flex-auto flex-col h-[92vh] overflow-hidden p-4 bg-verde-itam-2">
            <section class="menu pt-2">
                <MenuButton text="Mis asesores" img="home.svg" destination="/home/my_tutors" :type="path==='/home/my_tutors' ? 'pressed' : 'unPressed'"/>
                <MenuButton text="Buscar" img="search.svg" destination="/home/search" :type="path==='/home/search' ? 'pressed' : 'unPressed'"/>
                <div v-if="this.asesor">
                    <MenuButton text="Crear grupo" img="group_add.svg" destination="/home/publish_group" :type="path==='/home/publish_group' ? 'pressed' : 'unPressed'"/>
                    <MenuButton text="Mis grupos" img="group.svg" destination="/home/my_groups" :type="path==='/home/my_groups' ? 'pressed' : 'unPressed'"/>
                </div>
                
            </section>
            
            <!-- Agrega espacio entre Cerrar Sesión y los demás botones -->
            <div class="flex"></div>

            <section class="menu">
                <MenuButton text="Ajustes" img="settings.svg" destination="/home/settings" :type="path==='/home/settings' ? 'pressed' : 'unPressed'"/>
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

import { useUserStore } from '@/stores/user.js'
import { useRouter, useRoute } from "vue-router"

export default {
    name: "HomePage",
    components: { 
        MenuButton: defineAsyncComponent(() => import("@/" + paths["MenuButton"])), 
        RouterButton: defineAsyncComponent(() => import("@/" + paths["RouterButton"])), 
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useUserStore()
        
        return {
            // you can return the whole store instance to use it in the template
            router,
            route,
            store
        }
    },
    data() {
        return {
            session: this.store.session,
        }
    },
    async beforeCreate() {
        if (this.store.session === null) {
            this.router.replace({
                name: "Login",
            })
        }
    },
    
    
    computed: {
        path() {
            return this.route.path
        },
        asesor(){
            return this.store.currUser.asesor
        }
    },
    methods: {
        logout() {
            this.store.logout()
            this.store.$reset()
            console.log(this.store.session)
            this.router.replace({
                name: "Login",
            })
        },
        view_perfil() {
            console.log("Asesor: " + this.store.session.asesor)
        },
    }
}
</script>

<style lang="scss" scoped>
.home {
    display: flex;

    .content {
        flex: 1 2 auto;
        flex-flow: column;
        max-height: 2rem;
        //max-height: min-content;
    }
}

aside {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
    width: 13.5rem; //width: calc(13rem);// + 32px);
    min-width: 13.5rem;
    max-width: 13.5rem;
    overflow: hidden;
    //height: 100%;
    

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