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
                        <!-- <tarjeta-alumno :alumno="selectedAlumno" v-if="activatedAlumno"/> -->
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
                        :selected="false"
                    />
                </section>
            </div>
            
            
        </div>

    </div>
</template>
<script>
import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router";

import FilaTabla  from "@/components/dashboard/FilaTabla.vue"
import TextInput from "@/components/shared/TextInput.vue"

export default {
    name: "PublicacionesPage",
    components: {TextInput, FilaTabla},
    setup(){
        const router = useRouter();
        const store = useAdminStore()
        return {
            store,
            router
        }
    }, 
    data(){
        return {
            filtro: "",
            listaPublicaciones: []
        }
    },
    async beforeCreate(){
        this.listaPublicaciones = await this.store.listaPublicaciones()
        //console.log(this.listaAlumnos)
    },
    computed: {
        listaVisible(){
            //console.log(this.filtroNombre)
            //let lst = this.filtrarAsesores(this.filtroAsesor,this.listaAlumnos)
            //return this.filtrarNombres(this.filtroNombre, lst)
            
            return this.listaPublicaciones
            // /^(.*?)abc/
            // ([^x]+)     
        },
    },
}
</script>