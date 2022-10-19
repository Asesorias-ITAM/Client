<template>
    <div class="grid grid-cols-3 min-h-full">
        <div class="col-span-1 min-h-full"></div>

        <div class="col-span-1 min-h-full">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 bg-white drop-shadow-2xl">
                    <h5 class="text-center py-5 bg-verde-itam-1 text-white text3xl ">Introduce el código que se ha enviado a tu correo</h5>
                    <div id="registro" class="flex flex-col mx-14 ">
                        
                        <label class="mt-6">Correo Electrónico</label>
                        <TextInput v-model="correo" placeholder=""/>

                        <label class="mt-6">Código</label>
                        <TextInput v-model="codigo" placeholder=""/>
                        
                        <CustomLabel class="bad" text="Código Incorrecto" v-if="error"/>
                            
                            <div class="grid grid-cols-1">
                                <ActionButton text="Confirmar" @click="confirmar" type="primary"/>
                                <router-link to="/" class="text-center mb-6">¿Ya tienes cuenta? Inicia Sesión</router-link>
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

import { useRouter } from "vue-router";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";

import { useUserStore } from '@/stores/user.js'

//imports userpool data from config
import { POOL_DATA } from "@/config/cognito.js";

const userPool = new CognitoUserPool(POOL_DATA);

let router;
//let route;

export default{
    name: "ConfirmationPage",
    components: {ActionButton, TextInput, CustomLabel},
    data() {
        return {
            correo:"",
            codigo:"",
            error: false,
        }
    },
    setup(){
        router = useRouter();
        //get access to Vuex router
        router = useRouter();
        const store = useUserStore()
        return {
            // you can return the whole store instance to use it in the template
            store
        }
    },

    methods: {
        async confirmar(){

            // creates an object that contains the user pool info and username
            const userData = {
                Username: this.correo,
                Pool: userPool,
            };
            /*
            creates a Cognito User object and accepts the userData object
            */
            const cognitoUser = new CognitoUser(userData);
            /*
            calls the Cognito confirm registration method
            the method accepts the confirmation code sent to the
            users email address used to when signing up
            */
           //userData.Username
                 this.store.confirmUser({
                    "correo" :userData.Username, 
                    "confirmed": true
            })
            

            await cognitoUser.confirmRegistration(this.codigo, true, (err, /*result*/) => {
                if (err) {  
                    //setMessage(err.message, "alert-danger");
                    this.error = true
                    return;
                }
                

                //Llamo a la API y activo el usuario
                //call api confirm 

                router.replace({
                    name: "Login",
                });
            });
        }
    }
}
</script>