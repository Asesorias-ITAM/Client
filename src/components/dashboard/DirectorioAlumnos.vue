<template>
    <div id="contenedor" class="h-fit w-11/12 mt-20 mx-auto" >
        <div class="grid grid-cols-6">
            <div class="col-span-2">
                <section class="flex flex-col w-11/12 text-center mx-auto my-auto">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2 mt-14">
                            <TextInput v-model="filtroNombre" placeholder="   Buscar..." />
                        </div>
                    </div>
                    <div>
                        <label>Asesores </label>
                        <input type="checkbox" v-model="filtroAsesor" class="mb-6">
                    </div>
                </section>
            </div>
            <div class="col-span-4">
                <div class="grid grid-cols-6 place-items-center w-full text-center text-xl h-10 mb-0 mx-auto bg-verde-itam-1 text-white">
                    <div class="col-span-3">
                        <label>Correo</label>
                    </div>
                    <div class="col-span-3">
                        <label>Nombre Completo</label>
                    </div>
                </div>
                <section class="h-[70vh] overflow-auto">
                    <TarjetaAlumno 
                        v-for="alumno in listaVisible"
                        :key="alumno.correo"
                        :datosAlumno="alumno"
                    />
                    <TarjetaAlumno 
                        v-for="alumno in listaVisible"
                        :key="alumno.correo"
                        :datosAlumno="alumno"
                    />
                    <TarjetaAlumno 
                        v-for="alumno in listaVisible"
                        :key="alumno.correo"
                        :datosAlumno="alumno"
                    />
                    <TarjetaAlumno 
                        v-for="alumno in listaVisible"
                        :key="alumno.correo"
                        :datosAlumno="alumno"
                    />
                    <TarjetaAlumno 
                        v-for="alumno in listaVisible"
                        :key="alumno.correo"
                        :datosAlumno="alumno"
                    />

                </section>
            </div>
            
            
        </div>

    </div>
</template>
<script>
import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router";

import TarjetaAlumno from "@/components/dashboard/TarjetaAlumno.vue"
import TextInput from "@/components/shared/TextInput.vue"
//import ActionButton from "@/components/shared/ActionButton.vue"


export default {
    name: "DirectorioAlumnos",
    components: {TarjetaAlumno, TextInput},

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
            listaAlumnos: [],
            filtroNombre:"",
            filtroAsesor:false
        }
    },
    computed: {
        listaVisible(){
            
            if (this.filtroNombre){
                const regexObj = new RegExp("\\s*"+this.filtroNombre,'i')
            // /^(.*?)abc/
            // ([^x]+)
                const regexObj2 = new RegExp(+this.filtroNombre+"?@",'i')
                return this.listaAlumnos.filter(alumno => {
                    //console.log(alumno)
                    return (regexObj.test(alumno.nombre) || regexObj.test(alumno.apellidos) || regexObj.test(alumno.correo) && alumno.asesor==this.filtroAsesor)
    
                })
            }else{
                return this.listaAlumnos
            }
            
        }
    },
    async beforeCreate(){
        this.listaAlumnos = await this.store.listaAlumnos()
        //console.log(this.listaAlumnos)
    }
}
</script>
<style scoped>

</style>
