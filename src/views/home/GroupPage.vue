<template>
    <div class="container mx-auto w-7/12">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class="h-[55vh] max-h-[55vh] mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold">{{group.materia}}</h2>

                    <div class="grid grid-cols-8">
                        <div class="col-span-3 overflow-auto">
                            
                                <h3 class="bg-verde-itam-1 text-fondo-light-1 text-center text-4xl"
                                v-if="group.descripcion">
                                    Descripción
                                </h3>
                                <div class="ml-2 max-h-[46%] overflow-auto mb-5" v-if="group.descripcion">
                                    <h6 class="mt-4">{{group.descripcion}}
                                    </h6>
                                </div>
                            
                            
                            <h3 class=" bg-verde-itam-1 text-fondo-light-1 text-center text-4xl font-bold">{{"Precio: $"+ group.precio+" por sesión"}}</h3>
                        </div>
                        <div class="col-span-5 overflow-auto">
                            <h3 class="bg-verde-itam-1 text-fondo-light-1 text-center text-4xl">Asesor</h3>
                            <h3 class="my-3 text-3xl text-center">{{asesor}}</h3>
                            <div class="ml-8 mt-10">
                                <div v-if="group.alumno.carrera.length>0">
                                    <h3 class="text-3xl">Estudia</h3>   
                                    <ul class="list-disc list-inside">
                                        <li v-for="carrera in group.alumno.carrera" :key="carrera">
                                            {{carrera}}
                                        </li>
                                    </ul>
                                </div>
                            
                                <h3 class="text-3xl mt-16">Datos de contacto</h3>
                                <ul class="list-disc list-inside">
                                    <li>{{"Correo ITAM: "+group.alumno.correo}}</li>
                                    <li v-if="group.alumno.telefono">{{"Celular: "+group.alumno.telefono}}</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="flex flex-row-reverse">
                <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark" 
                    @click="inscribir"
                    v-if="pertenencia==='general'">
                    Inscribirme
                </button>
                <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark"
                    @click="dejar"
                    v-if="pertenencia==='asesores'">
                    Dejar grupo
                </button>
                <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark"
                    @click="borrar"
                    v-if="pertenencia==='publicaciones'">
                    Borrar
                </button>
            </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user.js'
import { useRouter, useRoute } from "vue-router"

export default {

    name: "GroupPage",
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useUserStore()
         
        return {
            router,
            route,
            store
        }
    },
    computed: {
        GroupID(){
            return this.route.params.id
        },
        group(){
            return this.store.currentGrupo
        },
        asesor(){
            return this.group.alumno.nombre + " " + this.group.alumno.apellido
        },

        pertenencia() {
            try {
                if(this.store.groupIDs.has(this.group.id)){
                    return "asesores"
                }else if(this.store.pubsIDs.has(this.group.id)){
                    return "publicaciones"
                }else{
                    return "general"
                }       
            } catch {
                return false
            }
            
        }

    },
    methods:{
        async inscribir() {
            try{
                await this.store.inscribirGrupo(this.group.id)
                this.listaAsesores = await this.store.getAsesores()
                this.$toast.success(`Inscripción exitosa`);
            }catch(error){
                console.log(error)
            }
            this.$emit("inscribirse", this.group.id)
            
        },
        async dejar() {
            try{
                await this.store.dejarGrupo(this.group.id)
                this.listaAsesores = await this.store.getAsesores()
                this.$toast.success(`Salida exitosa`);
            }catch(error){
                console.log(error)
            }
            this.$emit("dejar", this.group.id)
            
        },
        async borrar() {
            try{
                await this.store.eliminarPublicacion(this.group.id)
                await this.store.getGrupos()
                this.$toast.success(`Borrado exitoso`);
                this.router.replace({
                        name: "Search Groups",
                    })
                //console.log("Publicación a eliminar: "+this.grupo.id)
            }catch(error){
                console.log(error)
            }
            
            this.$emit("change", this.group.id)
        },
    }
}
</script>