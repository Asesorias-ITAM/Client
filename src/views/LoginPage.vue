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


import { POOL_DATA } from "@/config/cognito.js";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

// sets up Cognito User pool data
const userPool = new CognitoUserPool(POOL_DATA);

//get access to Vuex router
const router = useRouter();

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
        // sets up Cognito authentication data from sign in form
        const authData = {
            Username: this.correo,
            Password: this.passwd,
        };

        // sets up authentication details - includes username and user pool info
        const authDetails = new AuthenticationDetails(authData);
        const userData = {
            Username: authData.Username,
            Pool: userPool,
        };
        // creates a Cognito User object based on user auth details and user pool info
        const cognitoUser = new CognitoUser(userData);

        //calls the authenticate user method
        cognitoUser.authenticateUser(authDetails, {
            onSuccess(session) {
                console.log(session);
                // saves user session info to Vue state system
                setUserSessionInfo(session);

                // after logging in user is navigated to contacts list
                router.replace({
                name: "Contacts",
                params: { message: "You have successfully signed in" },
                });
            },
            onFailure(error) {
                console.log(error);

                // If MFA code is invalid error message is displayed
                if (!error.message.includes("SOFTWARE_TOKEN_MFA_CODE")) {
                setMessage(error.message, "alert-danger");
                }

                store.dispatch("setIsLoading", false);
            },
            totpRequired(codeDeliveryDetails) {
                /* 
                    Checks to see if MFA is required
                    If MFA is required to complete user authentication.
                    this will prompt the user for the MFA code
                    */
                //confirmMFACode.value = true;
                //cognitoUser.sendMFACode(mfaCode.value, this, codeDeliveryDetails);
            },
        });
            },

        }
}

</script>

