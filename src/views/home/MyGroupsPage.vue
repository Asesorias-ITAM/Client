<template>
    <section class="pt-4 pl-10 mt-3 mx-3">
        <div v-if="listaVisible.length>0" class="h-[78vh] overflow-auto">
            <div class="flex flex-wrap gap-10">
                <!-- columns-3xs gap-6 -->
                <!-- pub of listaVisible.length === 0 ? pubListPlaceholder : listaVisible -->
                <PublicationCard v-for="pub in listaVisible" :key="pub.id" v-bind="pub" 
                    :grupo="pub"
                />
            </div>
        </div>
        <div v-else class="text-center text-5xl dark:text-white/25 text-black/25">
            Aún no has creado ningún grupo.
        </div>
    </section>

    <!-- {{this.store.pubsIDs}} -->
</template>
<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

export default{
    name:"MyGroupsPage",
    components: { 
        PublicationCard: defineAsyncComponent(() => import("@/" + paths["PublicationCard"])),
    },
    setup() {
        const router = useRouter();
        const store = useUserStore()
        
        return {
            store,
            router,
        }
    },
    created() {
        this.store.getGrupos()
    },
    data() {
        return {
            
        }
    },
    computed: {
        listaVisible(){
            return this.store.currPublicaciones
        }
    }
}
</script>

<style scoped>

</style>