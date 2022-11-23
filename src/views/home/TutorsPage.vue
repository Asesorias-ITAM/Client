<template>
    <section class="card-grid my-3 mx-3">
        <div v-if="listaVisible.length>0" class="h-[78vh] overflow-auto">
            <div class="flex flex-wrap gap-4">
                <!-- columns-3xs gap-6 -->
                <!-- pub of listaVisible.length === 0 ? pubListPlaceholder : listaVisible -->
                <PublicationCard v-for="pub in listaVisible" :key="pub.id" v-bind="pub" 
                    :grupo="pub"
                />
            </div>
        </div>
        <div v-else class="text-center text-5xl dark:text-white/25 text-black/25">
            No está inscrito en nada...
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
        PublicationCard: defineAsyncComponent(() => import("@/" + paths["PublicationCard"])),
        
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

        this.store.getAsesores()
        //console.log(this.store.currAsesores)
    },
    computed: {
        listaVisible(){
            
            return this.store.currAsesores
        }
        
    },
}
</script>
<style scoped>
.card-grid {
	padding: 1rem 2rem;
	font-size: 0.875rem;
    overflow: hidden;
}

</style>