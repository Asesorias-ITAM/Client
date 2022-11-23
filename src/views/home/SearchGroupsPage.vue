<template>
    <section class="pt-4 pl-10 mt-3 mx-3">
        <TextInput v-model="filtro" placeholder="Buscar..." class="width-full"/>
        <div class="flex flex-col flex-auto max-h-[76vh] overflow-y-auto"><!--h-[78vh]-->
            <div class="flex flex-wrap gap-6">
            <!-- columns-3xs gap-6 -->
            <!-- pub of listaVisible.length === 0 ? pubListPlaceholder : listaVisible -->
            <PublicationCard v-for="pub in listaVisible" :key="pub.id" v-bind="pub" 
                :grupo="pub"
                @inscribirse="inscribirse"
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

let placeholder_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus lectus. Nullam sed augue eget elit viverra dignissim. Ut nec urna in."

export default {
    name: "SearchGroupsPage",
    components: { 
        PublicationCard: defineAsyncComponent(() => import("@/" + paths["PublicationCard"])),
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
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
            filtro: ""
        }
    },
    async beforeCreate() {
        this.pubList = await this.store.listaPublicaciones()
    },
    computed: {
        listaVisible() {
            return this.filtrarMaterias(this.filtro, this.pubList)
        }
    },
    methods:{
        filtrarMaterias(filtro,lista) {
            if(!filtro) {
                return lista
            } else {
                const regexObj = new RegExp("\\s*"+filtro,'i')
                return lista.filter(grupo => {
                    //console.log(publicacion)
                    return (regexObj.test(grupo.materia) || regexObj.test(grupo.alumno.nombre+" "+ grupo.alumno.apellido))
    
                })
            }

        },
        async inscribirse(id) {
            try {
                await this.store.inscribirGrupo(id)
                this.$toast.success(`Inscripción exitosa`);
            } catch(error) {
                console.log(error)
            }
        }
    }
    
}
</script>

<style scoped>
</style>