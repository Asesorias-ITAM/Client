<template>
    <div id="contenedor" class="h-fit w-11/12 mt-20 mx-auto" >
        <div class="grid grid-cols-6">
            <div class="col-span-2">
                <section class="flex flex-col w-11/12 text-center mx-auto my-auto">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2">
                            <TextInput v-model="filtro" placeholder="Buscar..." />
                        </div>
                    </div>
                    <div>
                       
                        <tarjeta-publicacion :publicacion="selectedPublicacion" v-if="activatedPublicacion" @eliminarPublicacion="eliminarPublicacion"/>
                    </div>
                </section>
            </div>
            <div class="col-span-4">
                <div class="grid grid-cols-6 place-items-center w-full text-center text-xl h-10 mb-0 mx-auto bg-verde-itam-1 text-white">
                    <div class="col-span-3">
                        <label>Materia</label>
                    </div>
                    <div class="col-span-3">
                        <label>Asesor</label>
                    </div>
                </div>
                
                <section class="h-[70vh] overflow-auto">
                    <FilaTabla 
                        v-for="publicacion in listaVisible"
                        :key="publicacion.id"
                        :col1="publicacion.materia"
                        :col2="publicacion.alumno.nombre +' ' +publicacion.alumno.apellido"
                        @click="selectPublicacion(publicacion)"
                        :selected="selectedPublicacion!==null && publicacion.id===selectedPublicacion.id"
                    /> 
                </section>
            </div>
            
            
        </div>

    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router";

export default {
    name: "PublicacionesPage",
    components: {
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
        FilaTabla: defineAsyncComponent(() => import("@/" + paths["FilaTabla"])),
        TarjetaPublicacion: defineAsyncComponent(() => import("@/" + paths["TarjetaPublicacion"])),
    },
    setup() {
        const router = useRouter()
        const store = useAdminStore()
        
        return {
            store,
            router
        }
    }, 
    data() {
        return {
            filtro: "",
            listaPublicaciones: [],
            selectedPublicacion: null,
            activatedPublicacion: false
        }
    },
    async beforeCreate() {
        this.listaPublicaciones = await this.store.listaPublicaciones()
        //console.log(this.listaPublicaciones)
    },
    computed: {
        listaVisible() {
            return this.filtrarMateria(this.filtro,this.listaPublicaciones)
        },
    },
    methods:{
        filtrarMateria(filtro, lista){
            if(!filtro){
                return lista
            }else{
                const regexObj = new RegExp("\\s*"+filtro,'i')
                return lista.filter(publicacion => {
                    //console.log(publicacion)
                    return (regexObj.test(publicacion.materia) || regexObj.test(publicacion.alumno.nombre+" "+ publicacion.alumno.apellido))
    
                })
            }
        },
        selectPublicacion(pub){
            //console.log(this.selectedPublicacion)
            if(this.activatedPublicacion && this.selectedPublicacion===pub) {
                this.selectedPublicacion = null
                this.activatedPublicacion = false
            } else {
                this.selectedPublicacion = pub
                this.activatedPublicacion = true
            }
        },
        async eliminarPublicacion(id){
            console.log(id)
            this.selectedPublicacion = null
            this.activatedPublicacion = false
            await this.store.eliminarPublicacion(id)
            this.listaPublicaciones = await this.store.listaPublicaciones()
        }
    }
}
</script>