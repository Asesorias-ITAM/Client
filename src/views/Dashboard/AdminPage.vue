<template>
    <section class="h-[90vh]">
        <div class="grid grid-cols-12 bgfondo-dark-1 h-full">
            <div class="col-span-2 bg-verde-itam-2 ">
                <div class="flex flex-col justify-items-center px-14 text-center text-2xl">
                    
                    <RouterButton text="Directorio" class = "mt-24" destination="/dashboard/directorio" :type="path==='/dashboard/directorio' ? 'pressed' : 'unPressed' " />
                    <RouterButton text="Publicaciones" class = "mt-24" destination="/dashboard/publicaciones" :type="path==='/dashboard/publicaciones' ? 'pressed' : 'unPressed' " />
                </div>
                
            </div>
            <div class="col-span-10">
                
                <router-view></router-view>
            </div>
        </div>
        
    </section>

</template>

<script>
import MenuButton from "@/components/shared/MenuButton"
import RouterButton from "@/components/shared/RouterButton"

import { useAdminStore } from '@/stores/admin.js'
import { useRouter,useRoute } from "vue-router";



export default {
    name: "HomePage",
    components: {MenuButton, RouterButton},
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
    /* beforeCreate(){
        if (this.store.session === null){
            router.replace({
                name: "Login",
            });
        }
    }, */
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

<style scoped>
*{
    border: 0px solid red;
}
</style>