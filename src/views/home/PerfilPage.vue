<template>
    <div class="container min-h-full max-w-[75%] mx-auto">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl">
                    <h2 class="text-center bg-verde-itam-1 text-fondo-light-1 text-3xl font-bold">Datos Alumno</h2>
                    <CustomLabel data-test="field-validator" class="bad" :text="error" v-if="error!==''"/>
                    <div id="datos" class="grid grid-cols-2 ml-4 mr-16 gap-x-20 mb-2">
                        <div class="col-span-1 flex flex-col">
                            
                            <label class="mt-2">Nombre(s)</label>
                            <TextInput v-model="tempUser.nombre" :disabled="!editando"/>
                            
                            <label>Apellidos</label>
                            <TextInput v-model="tempUser.apellido" :disabled="!editando"/>

                            <label>Carrera(s)</label>
                            <TextInput v-model="this.tempUser.carrera[0]" :disabled="!editando"/>
                            <TextInput v-model="this.tempUser.carrera[1]" :disabled="!editando"/>
                            
                        </div>
                        <div class="col-span-1 flex flex-col">
                            <label class="mt-2">Correo</label>
                            <TextInput v-model="tempUser.correo" :disabled="true"/>

                            <label>Teléfono</label>
                            <TextInput v-model="tempUser.telefono" :disabled="!editando"/>
    
                            <div>
                                <label>Quiero ser asesor </label>
                                <input type="checkbox" v-model="tempUser.asesor" :disabled="!editando" class="mb-6">
                            </div>
                        </div>
                        
                    </div>
                    <div class="grid grid-cols-8 gap-x-16">
                            <div class="col-start-3 col-span-4">
                                <ActionButton v-if="!editando" text="Editar" type="primary" class="w-full" @click="toggleEditing"/>
                                <div v-else class="col-start-3 col-span-4">
                                    <ActionButton  text="Cancelar" type="secondary" class="w-[50%]" @click="cancelar"/>
                                    <ActionButton  text="Guardar" type="primary" class="w-[50%]" @click="guardar"/>
                                </div>
                            </div>
                            
                        </div>
                </div>
            </div>
        </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user.js'
import { useRouter } from "vue-router"

export default {
    name: "PerfilPage",
    components: {
        ActionButton: defineAsyncComponent(() => import("@/" + paths["ActionButton"])), 
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
        CustomLabel: defineAsyncComponent(() => import("@/" + paths["CustomLabel"])),
    },
    data() {
        return {
            asesor: false,
            error: "",
            editando: false,
            carrera: ["",""],
            tempUser: {nombre: "", apellido:"",correo:"",asesor:false, carrera:["",""], telefono: "" }
        }
    },
    setup() {
        const router = useRouter()
        const store = useUserStore()

        return {
            store,
            router
        }
    },
    created(){
        this.refreshData()
    },
    methods:{
        toggleEditing(){
            this.editando=!this.editando
            
        },
        cancelar(){
            this.toggleEditing()
            this.refreshData()
        },
        async guardar(){
            this.toggleEditing()
            this.tempUser.carrera = this.tempUser.carrera.filter(carr => carr!=="")
            console.log(this.tempUser)
            await this.store.updatePerfil(this.tempUser)
            if(this.tempUser.asesor){
                this.store.restorePublications()
            }else{
                this.store.stopPublications()
            }
            this.refreshData()

        },
        refreshData(){
            /* //Object Destructuring
            const newSubsetObject = (({ personName, dateOfSubmission }) => ({ personName, dateOfSubmission }))(myOriginalObject); */
                this.tempUser = (({ nombre, apellido, correo, asesor, carrera, telefono}) => ({ nombre, apellido, correo, asesor, carrera, telefono}))(this.store.currUser);
            if(!this.tempUser.telefono){
                this.tempUser.telefono=""
            }
            if(this.tempUser.carrera.length===0){
                this.tempUser.carrera=["",""]
            }
            if(this.tempUser.carrera.length===1){
                this.tempUser.carrera=[this.tempUser.carrera[0],""]
            }
        }
    }
}
</script>