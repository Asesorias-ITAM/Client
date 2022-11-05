<template>
    <div id="contenedor" class="h-fit w-11/12 mx-auto" >
        <div class="h-[10vh]">HEllo</div>
        <div class="border-2">
            <div class="grid grid-cols-12 place-items-center w-11/12 text-center text-xl h-10 mb-0 mx-auto bg-white border-2">
                <div class="col-span-3">
                    <label>Correo</label>
                </div>
                <div class="col-span-6">
                    <label>Nombre Completo</label>
                </div>
                <div class="col-span-3">Asesor</div>
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
</template>
<script>
import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router";

import TarjetaAlumno from "@/components/dashboard/TarjetaAlumno.vue"
export default {
    name: "DirectorioAlumnos",
    components: {TarjetaAlumno},

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
            listaAlumnos: []
        }
    },
    computed: {
        listaVisible(){
            return this.listaAlumnos
        }
    },
    async beforeCreate(){
        this.listaAlumnos = await this.store.listaAlumnos()
        console.log(this.listaAlumnos)
    }
}
</script>
<style scoped>

</style>
