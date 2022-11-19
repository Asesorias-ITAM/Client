<template>
    <div id="contenedor" class="h-fit w-11/12 mt-20 mx-auto" >
        <div class="grid grid-cols-6">
            <div class="col-span-2">
                <section class="flex flex-col w-11/12 text-center mx-auto my-auto">
                    <div class="grid grid-cols-2">
                        <div class="col-span-2">
                            <TextInput v-model="filtroNombre" placeholder="   Buscar..." />
                        </div>
                    </div>
                    <div>
                        <label>Asesores </label>
                        <input type="checkbox" v-model="filtroAsesor" class="mb-6">
                    </div>
                    <div>
                        <tarjeta-alumno :alumno="selectedAlumno" v-if="activatedAlumno"/>
                        
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
                    <FilaTabla 
                        v-for="alumno in listaVisible"
                        :key="alumno.correo"
                        :datosAlumno="alumno"
                        @click="selectAlumno(alumno)"
                        :selected="selectedAlumno!==null && alumno.correo===selectedAlumno.correo"
                        :col1="alumno.correo"
                        :col2="alumno.nombre +' ' +alumno.apellido"
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
import TarjetaAlumno from "@/components/dashboard/TarjetaAlumno.vue"
import TextInput from "@/components/shared/TextInput.vue"
//import ActionButton from "@/components/shared/ActionButton.vue"


export default {
    name: "DirectorioAlumnos",
    components: {FilaTabla , TextInput, TarjetaAlumno},

    setup(){
        const router = useRouter();
        const store = useAdminStore()
        return {
            store,
            router
        }
    }, 
    data() {
        return {
            listaAlumnos: [],
            filtroNombre:"",
            filtroAsesor:false,
            selectedAlumno: null,
            activatedAlumno: false
        }
    },
    computed: {
        listaVisible() {
            //console.log(this.filtroNombre)
            let lst = this.filtrarAsesores(this.filtroAsesor,this.listaAlumnos)
            return this.filtrarNombres(this.filtroNombre, lst)
            
            // /^(.*?)abc/
            // ([^x]+)     
        },
    },
    async beforeCreate() {
        this.listaAlumnos = await this.store.listaAlumnos()
        //console.log(this.listaAlumnos)
    },
    methods: {
        filtrarAsesores(val, lista) {
            if (val===false){
                return lista
            }else{
                return lista.filter(alumno => alumno.asesor===true);
            }
        },
        filtrarNombres(val, lista) {
            if (!val){
                return lista
            }else{
                const regexObj = new RegExp("\\s*"+this.filtroNombre,'i')
                return lista.filter(alumno => {
                    //console.log(alumno)
                    return (regexObj.test(alumno.nombre) || regexObj.test(alumno.apellido) || regexObj.test(alumno.correo))
    
                })
            }
        },

        selectAlumno(alum){
            console.log(this.selectedAlumno === alum)

            if(this.activatedAlumno && this.selectedAlumno===alum){
                this.selectedAlumno = null
                this.activatedAlumno=false
            }else{
                this.selectedAlumno = alum
                this.activatedAlumno=true
            }
            
            
        }

    }
}
</script>
<style scoped>

</style>
