<template>
    <div class="grid grid-cols-7 bgfondo-dark-1">
        <div class="col-span-1 min-h-[90.2vh] bg-verde-itam-2">
            <div class="flex flex-col justify-items-center px-14 text-center text-2xl">
                
                <MenuButton text="Buscar" type="unPressed" class="mt-20"/>
                <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                <div class="my-48"></div>
                <MenuButton text="Mi Perfil" type="unPressed" class=""/>
                <MenuButton text="Cerrar Sesión" type="unPressed" @click="logout" class="mt-10"/>
            </div>
        </div>
        <div class="col-span-6 min-h-[90.2vh]">
            <router-view name="grid"></router-view>
            {{store.email}}
        </div>

    </div>

</template>

<script>
import MenuButton from "@/components/shared/MenuButton"

import { useUserStore } from '@/stores/user.js'
import { useRouter } from "vue-router";

let router;

export default {
    name: "HomePage",
    components: {MenuButton},
    setup(){
        router = useRouter();
        const store = useUserStore()
        return {
            // you can return the whole store instance to use it in the template
            store
        }
    },
    /* beforeCreate(){
        if (this.store.session === null){
            router.replace({
                name: "Login",
            });
        }
    }, */
    
    methods: {
        logout(){
            this.store.logout(); 
            this.store.$reset()
            console.log(this.store.session)
            router.replace({
                name: "Login",
            });
        }
    }
}

</script>

<style scoped>
*{
    border: 0px solid red;
}
</style>