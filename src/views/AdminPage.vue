<template>
    <div class="grid grid-cols-12 bgfondo-dark-1 min-h-[90.2vh]">
        <div class="col-span-2 bg-verde-itam-2">
            <div class="flex flex-col justify-items-center px-14 text-center text-2xl">
                
            </div>
        </div>
        <div class="col-span-10">
            
            <DirectorioAlumnos/>
        </div>

    </div>

</template>

<script>
import MenuButton from "@/components/shared/MenuButton"
import DirectorioAlumnos from "@/components/dashboard/DirectorioAlumnos"

import { useAdminStore } from '@/stores/admin.js'
import { useRouter } from "vue-router";



export default {
    name: "HomePage",
    components: {MenuButton, DirectorioAlumnos},
    setup(){
        const router = useRouter();
        const store = useAdminStore()
        return {
            // you can return the whole store instance to use it in the template
            store,
            router
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