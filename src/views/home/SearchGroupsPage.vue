<template>
    <section class="card-grid my-3 mx-3">
        <TextInput v-model="filtro" placeholder="Buscar..." class="width-full"/>
        <div class="h-[78vh] overflow-auto">
                <div class="flex flex-wrap gap-4">
                <!-- columns-3xs gap-6 -->
                <!-- pub of listaVisible.length === 0 ? pubListPlaceholder : listaVisible -->
                <PublicationCard v-for="pub in listaVisible" :key="pub.id" v-bind="pub" 
                    :grupo="pub"
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
    async beforeCreate(){
        this.store.getAsesores()
        this.pubList = await this.store.listaPublicaciones()
    },
    computed: {
        listaVisible(){
            return this.filtrarMaterias(this.filtro, this.pubList)
        }
    },
    methods:{
        filtrarMaterias(filtro,lista){
            if(!filtro){
                return lista
            }else{
                const regexObj = new RegExp("\\s*"+filtro,'i')
                return lista.filter(grupo => {
                    //console.log(publicacion)
                    return (regexObj.test(grupo.materia) || regexObj.test(grupo.alumno.nombre+" "+ grupo.alumno.apellido))
    
                })
            }

        },

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