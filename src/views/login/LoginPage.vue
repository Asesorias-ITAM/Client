<template>
    <div class="container min-h-full max-w-lg mx-auto">
        <div class="text-2xl subpixel-antialiased font-sans ">
            <div class="mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl dark:drop-shadow-2x1">
                <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2> <!-- Barra verde de arriba -->
                
                <div id="login" class="flex flex-col mx-14">
                    <label class="mt-6 text-texto-light-1 dark:text-texto-dark-1">Correo Electrónico</label>
                    <TextInput v-model="correo" @keyup.enter="onEnter"/>
                    <label>Contraseña</label>
                    <TextInput type="password" v-model="passwd" @keyup.enter="onEnter"/>
                    
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
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router"
import { POOL_DATA } from "@/config/cognito.js"
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"

/*  
Create a user pool object
The object parameter references the Cognito user pool data held in a constant that we 
setup in the Configure application to use Cognito User Pool section
*/
// sets up Cognito User pool data
const userPool = new CognitoUserPool(POOL_DATA)

export default {
    name: "LoginPage",
    components: {
        ActionButton: defineAsyncComponent(() => import("@/" + paths["ActionButton"])), 
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
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
            correo: "",
            passwd: "",
            incorrecto: false,
        }
    },
    methods: {
        onEnter() {
            // Presionar enter para hacer log in
            this.login()
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
            const authDetails = new AuthenticationDetails(authData)
            //console.log(authDetails)
            const userData = {
                Username: authData.Username,
                Pool: userPool,
            };
            // creates a Cognito User object based on user auth details and user pool info
            const cognitoUser = new CognitoUser(userData)
            //console.log("Pre Autenticación")
            //console.log(cognitoUser)
            //console.log(Object.keys(cognitoUser["signInUserSession"]))
            //https://bitcoden.com/answers/component-variable-cant-be-modified-in-a-callback-method-in-vuejs
            //calls the authenticate user method
            
            cognitoUser.authenticateUser(authDetails, {
                /*Nota: importante, para poder modificar las variables del componente desde un callback, tengo que hacerlo desde una arrow function*/ 
                onSuccess: async Session => {
                    await this.setUserSessionInfo(Session)
                    this.router.replace({
                        name: "tutors",
                    })
                    //console.log("Post Autenticación")
                    //console.log(cognitoUser)
                    //console.log(Session.idToken.payload)
                    //console.log(Session.idToken.payload.aud)
                    this.incorrecto=false
                },
                onFailure: (error) => {
                    console.log(error)
                    this.incorrecto=true
                },
            });   
        },

        async setUserSessionInfo(session) {
            //console.log(session)
            // starts timer to auto logout after 1 hour
            setTimeout(() =>  {
                this.store.autoLogout()
                //console.log("auto logging out");
                this.router.replace({
                    name: "Login",
                })
                alert("You have been automatically logged out")
            }, this.autoTimeout(session))

            await this.store.login(session)
        },

        // calculates when user will be auto logged out
        autoTimeout(result) {
            const seconds_timeout = 3600 // sets user login to expire after 1 hour
            const expirationDate =
                +result.idToken.payload["auth_time"] + seconds_timeout
                console.log(
                    "Auth Time " + +result.idToken.payload["auth_time"],
                    " Expire Date " + expirationDate
                )
            let expires_millseconds =
                (expirationDate - +result.idToken.payload["auth_time"]) * 1000
            console.log("Expires in milliseconds ", expires_millseconds)
            return expires_millseconds
        }

    }
}

</script>