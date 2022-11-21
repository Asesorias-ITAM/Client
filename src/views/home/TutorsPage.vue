<template>
    <section class="card-grid my-3 mx-3">
        <div class="h-[78vh] overflow-auto">
            <div class="flex flex-wrap gap-6">
                <!-- columns-3xs gap-6 -->
                <!-- pub of listaVisible.length === 0 ? pubListPlaceholder : listaVisible -->
                <GroupCard v-for="grupo in listaVisible" :key="grupo.id" :grupo="grupo" @dejarGrupo="dejarGrupo"
                />
            </div>
        </div>
    </section>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

export default{
    name:"TutorsPage.vue",
    components: { 
        GroupCard: defineAsyncComponent(() => import("@/" + paths["GroupCard"])),
        
    },

    setup(){
        const router = useRouter();
        const store = useUserStore()
        
        return {
            store,
            router,
        }
    },
    data(){
        return {
            listaAsesores: null
        }
    },
    async beforeCreate(){
        this.listaAsesores = await this.store.getAsesores()
        console.log(this.listaAsesores)
    },
    computed: {
        listaVisible(){
            
            return this.listaAsesores
        }
        
    },
    methods:{
        async dejarGrupo(id){
            try{
                await this.store.dejarGrupo(id)
                this.listaAsesores = await this.store.getAsesores()
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
.card-grid {
	padding: 1rem 2rem;
	font-size: 0.875rem;
    overflow: hidden;
}

</style>