<template>
    <section class="pt-4 pl-10 mt-3 mx-3">
        <div v-if="groupList.length>0" class="h-[78vh] overflow-auto">
            <div class="flex flex-wrap gap-4">
                <!-- columns-3xs gap-6 -->
                <!-- pub of listaVisible.length === 0 ? pubListPlaceholder : listaVisible -->
                <GroupCard v-for="pub in groupList" :key="pub.id" v-bind="pub" 
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
        GroupCard: defineAsyncComponent(() => import("@/" + paths["GroupCard"])),
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
            groupList: [{"id": 123, "alumno": {"nombre": "Gamboa", "apellido": "Invento"}, "materia": "Garbanzo", "descripcion": "Lorem ipsum"},
                        {"id": 123, "alumno": {"nombre": "Gamboa", "apellido": "Invento"}, "materia": "Garbanzo", "descripcion": "Lorem ipsum"},
                        {"id": 123, "alumno": {"nombre": "Gamboa", "apellido": "Invento"}, "materia": "Garbanzo", "descripcion": "Lorem ipsum"}],
        }
    },
    async beforeCreate() {
        //this.store.getGrupos()
        //this.groupList = await this.store.listaPublicaciones()
    },
}
</script>

<style scoped>

</style>