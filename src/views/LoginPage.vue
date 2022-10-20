<template>
    <div class="grid grid-cols-3 min-h-full">
        <div class="col-span-1 min-h-full"></div>

        <div class="col-span-1 min-h-full">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl dark:drop-shadow-2x1">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                    <div id="registro" class="flex flex-col mx-14">
                        <label class="mt-6 text-texto-light-1 dark:text-texto-dark-1">Correo Electrónico</label>
                        <TextInput v-model="correo" @keyup.enter="onEnter" placeholder="" class="textBox"/>
                        <label>Contraseña</label>
                        <TextInput type="password" v-model="passwd" @keyup.enter="onEnter" placeholder="" class="textBox"/>
                        
                        <CustomLabel class="bad" text="Credenciales Incorrectas" v-if="incorrecto" data-test='field-validator'/>

                        <div class="grid grid-cols-1">
                            <ActionButton text="Iniciar Sesión" @click="login" type="primary" data-test='login-button'/>
                            <router-link to="/register" class="text-center mb-6 hover:text-texto-hover-light-1 hover:dark:text-texto-hover-dark-1" data-test='go-to-register'>
                                ¿No tienes cuenta? Regístrate
                            </router-link>
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

import { useUserStore } from '@/stores/user.js'
//import { storeToRefs } from 'pinia'

import { useRouter } from "vue-router";
import { POOL_DATA } from "@/config/cognito.js";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";


/*  
Create a user pool object
The object parameter references the Cognito user pool data held in a constant that we 
setup in the Configure application to use Cognito User Pool section
*/
// sets up Cognito User pool data
const userPool = new CognitoUserPool(POOL_DATA);
let router;
//let store;

export default{
    name: "LoginPage",
    components: {ActionButton, TextInput, CustomLabel},
    setup() {
        //get access to Vuex router
        router = useRouter();
        const store = useUserStore()
        
        return {
            // you can return the whole store instance to use it in the template
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
            //console.log(this.store.test)
            //console.log(this.incorrecto)
            // sets up Cognito authentication data from sign in form
            const authData = {
                Username: this.correo,
                Password: this.passwd,
            };

            // sets up authentication details - includes username and user pool info
            const authDetails = new AuthenticationDetails(authData);
            //console.log(authDetails)
            const userData = {
                Username: authData.Username,
                Pool: userPool,
            };
            // creates a Cognito User object based on user auth details and user pool info
            const cognitoUser = new CognitoUser(userData);
            //console.log(cognitoUser)
            //https://bitcoden.com/answers/component-variable-cant-be-modified-in-a-callback-method-in-vuejs
            //calls the authenticate user method
            
            cognitoUser.authenticateUser(authDetails, {
                /*Nota: importante, para poder modificar las variables del componente desde un callback, tengo que hacerlo desde una arrow function*/ 
                onSuccess: Session => {
                    //console.log(Session)
                    this.setUserSessionInfo(Session)
                    router.replace({
                        name: "Home",
                    });
                    //console.log(Session.idToken.payload)
                    //console.log(Session.idToken.payload.aud)
                    this.incorrecto=false;
                },
                onFailure: () => {
                    //console.log(error);

                    this.incorrecto=true;
                    
                }

            });   
        },

        setUserSessionInfo(session){
            //console.log(session)
            // starts timer to auto logout after 1 hour
            setTimeout(() =>  {
                this.store.autoLogout();
                //console.log("auto logging out");
                router.replace({
                    name: "Login",
                });
                alert("You have been automatically logged out");
            }, this.autoTimeout(session));

            this.store.login(session)
        },

        // calculates when user will be auto logged out
        autoTimeout(result) {
            const seconds_timeout = 3600; // sets user login to expire after 1 hour
            const expirationDate =
                +result.idToken.payload["auth_time"] + seconds_timeout;
                console.log(
                    "Auth Time " + +result.idToken.payload["auth_time"],
                    " Expire Date " + expirationDate
                );
            let expires_millseconds =
                (expirationDate - +result.idToken.payload["auth_time"]) * 1000;
            console.log("Expires in milliseconds ", expires_millseconds);
            return expires_millseconds;
        }

    }
}

</script>

<style>
.textBox {
    border-radius: 7px;
}
</style>
