<template>
    <h2>ALUMNO</h2>
    {{this.listaAlumnos}}
</template>
<script>
import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router";
export default {
    name: "DirectorioAlumnos",
    components: {},

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
    async beforeCreate(){
        this.listaAlumnos = await this.store.listaAlumnos()
        console.log(this.listaAlumnos)
    }
}
</script>
<style>

</style>
