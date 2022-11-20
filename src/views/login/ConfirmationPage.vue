<template>
    <div class="grid grid-cols-3 min-h-full">
        <div class="col-span-1 min-h-full"></div>

        <div class="col-span-1 min-h-full">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class="mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl">
                    <h5 class="text-center py-5 bg-verde-itam-1 text-white text3xl ">Introduce el código que se ha enviado a tu correo</h5>
                    <div id="registro" class="flex flex-col mx-14 ">
                        
                        <label class="mt-6">Correo Electrónico</label>
                        <TextInput v-model="correo"/>

                        <label class="mt-6">Código</label>
                        <TextInput v-model="codigo"/>
                        
                        <CustomLabel class="bad" :text="error" v-if="error!==''" data-test='field-validator'/>
                            
                            <div class="grid grid-cols-1">
                                <ActionButton text="Confirmar" @click="confirmar" type="primary" data-test='confirm-button' />
                                <router-link to="/" class="text-center mb-6" data-test='back-to-login' >¿Ya tienes cuenta? Inicia Sesión</router-link>
                            </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-1 min-h-full"></div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useRouter } from "vue-router"
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js"
import { useUserStore } from '@/stores/user.js'
import { POOL_DATA } from "@/config/cognito.js"

const userPool = new CognitoUserPool(POOL_DATA)

export default {
    name: "ConfirmationPage",
    components: {
        ActionButton: defineAsyncComponent(() => import("@/" + paths["ActionButton"])), 
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
        CustomLabel: defineAsyncComponent(() => import("@/" + paths["CustomLabel"])),
    },
    data() {
        return {
            correo: "",
            codigo: "",
            error: "",
        }
    },
    setup() {
        //get access to Vuex router
        const router = useRouter()
        const store = useUserStore()

        return {
            store,
            router
        }
    },

    methods: {
        async confirmar() {

            // creates an object that contains the user pool info and username
            const userData = {
                Username: this.correo,
                Pool: userPool,
            }
            //creates a Cognito User object and accepts the userData object
            const cognitoUser = new CognitoUser(userData)
            /*
            calls the Cognito confirm registration method
            the method accepts the confirmation code sent to the
            users email address used to when signing up
            */
            this.store.confirmUser({
                "correo" :userData.Username, 
                "confirmed": true
            })
            
            await cognitoUser.confirmRegistration(this.codigo, true, (err, /*result*/) => {
                if (err) {  
                    //setMessage(err.message, "alert-danger");
                    this.error = "Código incorrecto"
                    return
                }
                
                //Llamar a la API y activar el usuario
                console.log("Error en confPage.vue: " + this.error)

                this.router.replace({
                    name: "Login",
                })
            })
        }
    }
}
</script>