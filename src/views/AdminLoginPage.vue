<template>
    <div class="grid grid-cols-3 min-h-full">
        <div class="col-span-1 min-h-full"></div>


        <div class="col-span-1 min-h-full">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl dark:drop-shadow-2x1">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                    <div id="login" class="flex flex-col mx-14">
                        <label class="mt-6 text-texto-light-1 dark:text-texto-dark-1">Correo Electrónico</label>
                        <TextInput v-model="correo" @keyup.enter="onEnter" placeholder="" class="textBox"/>
                        <label>Contraseña</label>
                        <TextInput type="password" v-model="passwd" @keyup.enter="onEnter" placeholder="" class="textBox"/>
                        
                        <CustomLabel class="bad" text="Credenciales Incorrectas" v-if="incorrecto" data-test='field-validator'/>

                        <div class="grid grid-cols-1">
                            <ActionButton text="Iniciar Sesión" @click="login" type="primary" data-test='login-button' class="mb-6"/>

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
import CustomLabel from "@/components/shared/CustomLabel"

import { useAdminStore } from '@/stores/admin'


export default{
    name: "AdminLoginPage",
    components: {ActionButton, TextInput, CustomLabel},
    setup(){
        const store = useAdminStore()

        return {
            store
        }
    },  
    data(){
        return {
            correo: "",
            passwd: "",
            incorrecto: false,
        }
    },
    methods:{
        onEnter() {
            // Presionar enter para hacer log in
            this.login();
        },
        login() {
             this.store.loginAdmin()
        },

        
    }
}

</script>

<style> 
.textBox {
    border-radius: 7px;
}
</style>
