<template>
    <!--{{store.email}}-->

    <!--div class="grid grid-flow-col auto-cols-auto bgfondo-dark-1"-->
    <div class="grid grid-cols-7">
        <div class="sidebar col-span-1 min-h-[90.2vh] bg-verde-itam-2">
            <section class="flex flex-col justify-items-center px-14  text-center text-2xl">
                
                <RouterButton text="Buscar" destination="/home/search" :type="path==='/home/search' ? 'pressed' : 'unPressed' " class="py-5"/>
                <RouterButton text="Crear grupo" destination="/home/publish_group" :type="path==='/home/publish_group' ? 'pressed' : 'unPressed' "/>
                <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                <MenuButton text="Mis Asesorías" type="unPressed" class="mt-10"/> <!--v-if="store.session.asesor"-->
                
                <MenuButton text="Mi Perfil" type="unPressed" @click="view_perfil" class="mt-10"/>
                <MenuButton text="Cerrar Sesión" type="unPressed" @click="logout" class="mt-10"/>
            </section>
        </div>
        
        <!--section class="card-grid grid-flow-col auto-cols-auto"-->
        <section class="col-span-6">
            <!--div class="grid grid-flow-col auto-cols-auto gap-6"-->
            <router-view></router-view>
        </section>
        
        <!--section class="card-grid my-3">
            <div class="grid grid-cols-4 gap-6">
                <PublicationCard materia="Economía I" asesor="Juan Acosta" desc="placeholder_desc"/>
            </div>
        </section-->

        {{session}}
        {{asesor}}
    </div>
</template>

<script>
import MenuButton from "@/components/shared/MenuButton.vue"
import RouterButton from "@/components/shared/RouterButton.vue"
import { useUserStore } from '@/stores/user.js'
import { useRouter, useRoute } from "vue-router"

export default {
    name: "HomePage",
    components: { MenuButton, RouterButton },
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
            asesor: this.store.session.asesor,
        }
    },
    /* beforeCreate(){
        if (this.store.session === null){
            router.replace({
                name: "Login",
            });
        }
    }, */
    computed: {
        path() {
            return this.route.path
        }
    },
    methods: {
        logout() {
            this.store.logout(); 
            this.store.$reset()
            console.log(this.store.session)
            router.replace({
                name: "Login",
            });
        },
        view_perfil() {
            console.log("Asesor: " + this.store.session.asesor)
        },
    }
}
</script>

<style scoped>
.sidebar {
    max-width: 14rem;
}

</style>