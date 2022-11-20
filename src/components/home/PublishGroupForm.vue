<template>
    <div class="container min-h-full max-w-2xl mx-auto">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class="mt-6 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                    <div id="registro" class="flex flex-col mx-14 mb-2">
                        
                        <CustomLabel data-test="field-validator" class="bad" :text="error" v-if="error!==''"/>

                        <label class="mt-2">Materia</label>
                        <TextInput v-model="materia" @keyup.enter="onEnter"/>
                        
                        <label>Descripción</label>
                        <TextArea v-model="descripcion" @keyup.enter="onEnter" :placeholder="desc_placeholder" class=""></TextArea>

                        <label>Precio (opcional)</label>
                        <TextInput type="number" v-model="precio" @keyup.enter="onEnter" placeholder="Si no vas a cobrar, deja este campo vacío"/>

                        <!--CustomLabel data-test="password_validator" class="bad" text="Las contraseñas no coinciden" v-if="!compara"/-->
                        
                        <div class="grid grid-cols-1 py-2">
                            <ActionButton text="Crear grupo" @click="crearGrupo" type="primary" data-test='register-button'/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router"

export default {
    name: "PublishGroupForm",
    components: { 
        ActionButton: defineAsyncComponent(() => import("@/" + paths["ActionButton"])), 
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
        TextArea: defineAsyncComponent(() => import("@/" + paths["TextArea"])),
        CustomLabel: defineAsyncComponent(() => import("@/" + paths["CustomLabel"])),
    },
    setup() {
        const router = useRouter()
        const store = useUserStore()
        
        return {
            store,
            router
        }
    },
    data() {
        return {
            materia: "",
            descripcion: "",
            precio: "",
            error: "",
            desc_placeholder: "Agrega una breve descripción para tus alumnos.\n" +
                              "Por ejemplo, tu horario disponible, temas que dominas, si resuelves laboratorios, forma de pago, etc.",
        }
    },
    methods: {
        crearGrupo() {
            //"0" ? parseInt("0") : 0
            const publicacion = {
                "materia": this.materia,
                "descripcion": this.descripcion,
                "precio": this.precio ? parseInt(this.precio) : 0
            }
            this.store.crearGrupo(publicacion)
        },
        
        onEnter() {
            this.crearGrupo()
        }
    }
}

</script>

