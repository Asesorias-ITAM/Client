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
                        <TextInput type="password" v-model="passwd" placeholder=""/>
                        
                        <CustomLabel class="bad" text="Credenciales Incorrectas" v-if="incorrecto"/>

                        <div class="grid grid-cols-1">
                            <ActionButton text="Iniciar Sesión" @click="login" type="primary"/>
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
import CustomLabel from "@/components/shared/CustomLabel"

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

export default{
    name: "LoginPage",
    components: {ActionButton, TextInput, CustomLabel},
    setup() {
        //get access to Vuex router
        router = useRouter();
    },
    data(){
        return {
            correo: "",
            passwd:"",
            incorrecto: false,
        }
    },
    computed:{
        
    },
    methods:{
        login() {
            console.log(this.incorrecto)
            
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
                    console.log(Session)

                    router.replace({
                        name: "Home",
                    });
                    this.incorrecto=false;
                },
                onFailure: error => {
                    console.log(error);

                    this.incorrecto=true;
                    
                }

            });   
        },

    }
}

</script>

