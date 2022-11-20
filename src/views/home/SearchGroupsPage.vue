<template>
    <section class="card-grid my-3">
        <div class="grid grid-cols-4 gap-6">
            <PublicationCard v-for="pub of pubList.length === 0 ? pubListPlaceholder : pubList" :key="pub.id" v-bind="pub"/>
        </div>
    </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

let placeholder_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus lectus. Nullam sed augue eget elit viverra dignissim. Ut nec urna in."

export default {
    name: "SearchGroupsPage",
    components: { 
        PublicationCard: defineAsyncComponent(() => import("@/" + paths["PublicationCard"]))
    },
    setup() {
        const router = useRouter();
        const store = useUserStore()
        
        return {
            store,
            router
        }
    },
    data() {
        return {
            pubList: [],
            pubListPlaceholder: [{id: 0, materia: "Economía I", asesor: "Juan Acosta", descripcion: placeholder_desc},
                       {id: 1, materia: "Ideas III", asesor: "Rosa Sarmiento", descripcion: placeholder_desc},
                       {id: 2, materia: "SCE", asesor: "POJO", descripcion: placeholder_desc},
                       {id: 3, materia: "OPC", asesor: "Don Ramón", descripcion: placeholder_desc},
                       {id: 4, materia: "Redes I", asesor: "1ms", descripcion: placeholder_desc},
                      ],
        }
    },
    async beforeCreate(){
        this.pubList = await this.store.listaPublicaciones()
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