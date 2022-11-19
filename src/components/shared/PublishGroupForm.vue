<template>
    <div class="container min-h-full max-w-2xl mx-auto">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class="mt-10 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                    <div id="registro" class="flex flex-col mx-14 mb-2">
                        
                        <CustomLabel data-test="field-validator" class="bad" :text="error" v-if="error!==''"/>

                        <label class="mt-2">Materia</label>
                        <TextInput v-model="materia" @keyup.enter="onEnter" placeholder="" class="textBox px-3"/>
                        
                        <label>Descripción</label>
                        <TextInput v-model="desc" @keyup.enter="onEnter" :placeholder="desc_placeholder" class="textBox align-text-top placeholder:align-text-top break-normal placeholder:break-words px-3 py-20"/>
                        
                        <label>Precio (opcional)</label>
                        <TextInput type="precio" v-model="precio" @keyup.enter="onEnter" placeholder="Si no vas a cobrar, escribe '0'" class="textBox px-3"/>

                        <!--CustomLabel data-test="password_validator" class="bad" text="Las contraseñas no coinciden" v-if="!compara"/-->
                        
                        <div class="grid grid-cols-1 py-2">
                            <ActionButton text="Crear grupo" @click="registrar" type="primary" data-test='register-button'/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import ActionButton from "@/components/shared/ActionButton"
import TextInput from "@/components/shared/TextInput"


export default {
    name: "PublishGroupForm",
    components: { ActionButton, TextInput },
    data(){
        return {
            materia: "",
            desc: "",
            precio: null,
            error: "",
            desc_placeholder: "Agrega una breve descripción para tus alumnos.\n" +
                              "Por ejemplo, tu horario disponible, temas que dominas, si resuelves laboratorios, forma de pago, etc.",
        }
    },
}

</script>

