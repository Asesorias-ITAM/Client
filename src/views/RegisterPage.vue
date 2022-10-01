<template>
        <div class="grid grid-cols-3 min-h-full">
            <div class="col-span-1 min-h-full"></div>

            <div class="col-span-1 min-h-full">
                <div class="text-2xl subpixel-antialiased font-sans ">

                    <div class=" mt-16 border-4 bg-white drop-shadow-2xl">
                        <h2 class="text-center py-5 bg-verde-itam-1 text-white text-4xl font-bold">Regístrate</h2>
                        <div id="registro" class="flex flex-col mx-14 ">
                            
                            <label class="mt-6">Correo Electrónico</label>
                            <TextInput v-model="correo" placeholder=""/>
                            <label>Nombres(s)</label>
                            <TextInput v-model="nombre" placeholder=""/>
                            <label>Apellidos</label>
                            <TextInput v-model="apellido" placeholder=""/>
                            <label>Contraseña</label>
                            <TextInput v-model="passwd" placeholder=""/>
                            <label>Confirma Contraseña</label>
                            <TextInput v-model="passwd2" placeholder=""/>
                            <div class="grid grid-cols-1">
                                <div>
                                    <label>Quiero ser asesor </label>
                                    <input id="" type="checkbox" v-model="asesor" class="mb-6">
                                </div>
                                <ActionButton text="Crear cuenta" type="primary"/>
                                <label class="text-center mb-6">¿Ya tienes cuenta? Inicia Sesión</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-1 min-h-full"></div>
        </div>
</template>

<script>
import ActionButton from "@/components/shared/ActionButton"
import TextInput from "@/components/shared/TextInput"

export default{
    name: "RegisterPage",
    components: {ActionButton, TextInput},
    data(){
        return {
            nombre: "",
            apellido: "",
            passwd: "",
            passwd2: "",
            correo: "",
            asesor:0
        }
    }
}

</script>

