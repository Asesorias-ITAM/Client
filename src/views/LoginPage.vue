<template>
    <div class="grid grid-cols-3 min-h-full">
        <div class="col-span-1 min-h-full"></div>

        <div class="col-span-1 min-h-full">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 bg-white drop-shadow-2xl">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-white text-4xl font-bold"></h2>
                    <div id="registro" class="flex flex-col mx-14 ">
                        
                        <label class="mt-6">Correo Electrónico</label>
                        <TextInput v-model="correo" placeholder=""/>
                        <label>Contraseña</label>
                        <TextInput v-model="passwd" placeholder=""/>

                        <div class="grid grid-cols-1">
                            <ActionButton text="Iniciar Sesión" @click="Registrar" type="primary"/>
                            <router-link to="/register" class="text-center mb-6">¿No tienes cuenta? Regístrate</router-link>
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
name: "LoginPage",
components: {ActionButton, TextInput},
data(){
    return {
        correo: "",
        passwd:"",

    }
},
methods:{
    Login() {

    },

}
}

</script>

