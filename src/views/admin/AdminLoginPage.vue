<template>
    <div class="grid grid-cols-3 min-h-full">
        <div class="col-span-1 min-h-full"></div>


        <div class="col-span-1 min-h-full">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl dark:drop-shadow-2x1">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                    
                    <div id="login" v-if="!firstLogin" class="flex flex-col mx-14 text-texto-light-1 dark:text-texto-dark-1">
                        <label class="mt-6 ">Correo Electrónico</label>
                        <TextInput v-model="correo" placeholder="" class="textBox"/>
                        <label>Contraseña</label>
                        <TextInput type="password" v-model="passwd" placeholder="" class="textBox"/>
                        <CustomLabel class="bad" text="Credenciales Incorrectas" v-if="incorrecto" data-test='field-validator'/>

                        <div class="grid grid-cols-1">
                            <ActionButton text="Iniciar Sesión" @click="login" type="primary" data-test='login-button' class="mb-6"/>

                        </div>
                    </div>
                    <div id="firstLogin" v-if="firstLogin" class="flex flex-col mx-14 text-texto-light-1 dark:text-texto-dark-1">
                        <CustomLabel class="mt-6" text="Es necesario cambiar contraseña"/>
                        <CustomLabel data-test="field-validator" class="bad" :text="error" v-if="error!==''"/>
                        <label class="mt-6 ">Nueva contraseña</label>
                        <TextInput type="password" v-model="newPasswd1"  placeholder="" class="textBox"/>
                        <label>Confirma nueva contraseña</label>
                        <TextInput type="password" v-model="newPasswd2"  placeholder="" class="textBox"/>
                    
                        <CustomLabel data-test="password_validator" class="bad" text="Las contraseñas no coinciden" v-if="!compara"/>

                        <div class="grid grid-cols-1">
                            <ActionButton text="Cambiar contraseña" @click="passwordChange" type="primary" data-test='login-button' class="mb-6"/>

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

import {validateAdminForm } from "@/utils/validator.js"

import { useAdminStore } from '@/stores/admin'
import { useRouter } from "vue-router";
import { POOL_DATA } from "@/config/cognito2.js";
import { CognitoUserPool, CognitoUser, AuthenticationDetails, } from "amazon-cognito-identity-js";    

const userPool = new CognitoUserPool(POOL_DATA);

export default {
    name: "AdminLoginPage",
    components: {
        ActionButton: defineAsyncComponent(() => import("@/" + paths["ActionButton"])), 
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
        CustomLabel: defineAsyncComponent(() => import("@/" + paths["CustomLabel"])),
    },
    setup() {
        const store = useAdminStore()
        const router = useRouter()
        
        return {
            store,
            router
        }
    },  
    data() {
        return {
            correo: "",
            passwd: "",
            newPasswd1: "",
            newPasswd2: "",
            error: "",
            incorrecto: false,
            firstLogin: false,
            sessionUserAttributes: null,
            cognitoUser: null
        }
    },
    computed: {
        compara() {
            return this.newPasswd1===this.newPasswd2
        }
    },
    methods:{
        createCognitoUser() {
            const authData = {
                Username: this.correo,
                Password: this.passwd,
            }
            const userData = {
                Username: authData.Username,
                Pool: userPool,
            }
            const cognitoUser = new CognitoUser(userData)
            return cognitoUser

        },
        login() {
            this.cognitoUser = this.createCognitoUser()
            const authData = {
                Username: this.correo,
                Password: this.passwd,
            }
            const authDetails = new AuthenticationDetails(authData)
            
            this.cognitoUser.authenticateUser(authDetails, {
                /*Nota: importante, para poder modificar las variables del componente desde un callback, tengo que hacerlo desde una arrow function*/ 
                onSuccess: Session => {
                    this.setUserSessionInfo(Session)
                    console.log(Session)
                    this.router.replace('/dashboard/directorio')
                    this.incorrecto = false
                },
                onFailure: (error) => {
                    console.log(error)
                    this.incorrecto = true
                    
                },
                newPasswordRequired: (userAttributes, requiredAttributes) =>{
                    // the api doesn't accept this field back
                    delete userAttributes.email_verified
                    delete userAttributes.email

                    this.firstLogin = true
                    console.log(userAttributes)
                    this.sessionUserAttributes = userAttributes
                }

            })
        },
        passwordChange() {
            const datos = {
                correo: this.correo,
                passwd: this.newPasswd1,
            }

            let validation = validateAdminForm(datos)

            if (!validation[0]) {
                this.error = validation[1]
                return
            }

            this.cognitoUser.completeNewPasswordChallenge(datos.passwd, this.sessionUserAttributes, {
                onSuccess: Session => {
                    this.setUserSessionInfo(Session)
                    //console.log(Session)
                    this.router.replace('/dashboard/directorio')
                    this.incorrecto = false
                },
                onFailure: (error) => {
                    console.log(error)
                    this.incorrecto = true
                    
                },

            })
        },
        setUserSessionInfo(session) {
            // starts timer to auto logout after 1 hour
            setTimeout(() =>  {
                this.store.autoLogout()
                //console.log("auto logging out");
                router.replace({
                    name: "AdminLogin",
                })
                alert("You have been automatically logged out")
            }, this.autoTimeout(session))

            this.store.login(session)
        },
        // calculates when user will be auto logged out
        autoTimeout(result) {
            const seconds_timeout = 1800 // sets user login to expire after 1 hour
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
