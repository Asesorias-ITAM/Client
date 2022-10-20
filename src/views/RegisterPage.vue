<template>
        <div class="grid grid-cols-3">
            <div class="col-span-1 min-h-full"></div>

            <div class="col-span-1 min-h-full">
                <div class="text-2xl subpixel-antialiased font-sans ">
                    <div class=" mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl">
                        <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                        <div id="registro" class="flex flex-col mx-14 mb-2">
                            
                            <CustomLabel class="bad" :text="error" v-if="error!==''" data-test='field-validator'/>

                            <label class="mt-2">Correo Electrónico</label>
                            <TextInput v-model="correo" @keyup.enter="onEnter" placeholder="" class="textBox"/>
                            
                            <label>Nombre(s)</label>
                            <TextInput v-model="nombre" @keyup.enter="onEnter" placeholder="" class="textBox"/>
                            
                            <label>Apellidos</label>
                            <TextInput v-model="apellido" @keyup.enter="onEnter" placeholder="" class="textBox"/>

                            <label>Contraseña</label>
                            <TextInput type="password" v-model="psswd" @keyup.enter="onEnter" placeholder="" class="textBox"/>

                            <label>Confirma Contraseña</label>
                            <TextInput type="password" v-model="psswd2" @keyup.enter="onEnter" placeholder="" class="textBox"/>

                            <CustomLabel class="bad" text="Las contraseñas no coinciden" v-if="!compara" data-test='password-validator'/>
                            
                            <div class="grid grid-cols-1">
                                <div>
                                    <label>Quiero ser asesor </label>
                                    <input id="" type="checkbox" v-model="asesor" class="mb-6">
                                </div>
                                <ActionButton text="Crear cuenta" @click="registrar" type="primary" data-test='register-button'/>
                                <router-link to="/" class="text-center mb-6 hover:text-texto-hover-light-1 hover:dark:text-texto-hover-dark-1" data-test='back-to-login'>
                                    ¿Ya tienes cuenta? Inicia Sesión
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

import {validateRegisterForm } from "@/utils/validator.js"

//Código de Registro adaptado de https://github.com/aws-samples/amazon-cognito-vue-workshop/blob/main

//import { useRouter } from "vue-router";
//import router from "@/router/index.js";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { POOL_DATA } from "@/config/cognito.js";

//get access to Vuex router
//let router;
        /*  
        Create a user pool object
        The object parameter references the Cognito user pool data held in a constant that we 
        setup in the Configure application to use Cognito User Pool section
        */
const userPool = new CognitoUserPool(POOL_DATA);

export default{
    name: "RegisterPage",
    components: {ActionButton, TextInput, CustomLabel},
    data(){
        return {
            nombre: "",
            apellido: "",
            psswd: "",
            psswd2: "",
            correo: "",
            asesor: false,
            error: "",
        }
    },
    setup() {
        //get access to Vuex router
        //router = useRouter();
    },
    computed: {
        compara(){
            return this.psswd===this.psswd2
        }
    },

    methods:{
        onEnter() {
            // Presionar enter para registrarse
            this.registrar();
        },
        async registrar() {
            let emailString = this.correo.toLowerCase()

            const datos = {
                correo: emailString,
                nombre: this.nombre,
                apellido: this.apellido,
                passwd: this.psswd,
            }

            if (!validateRegisterForm(datos)){
                this.error = "Todos los campos deben contener información"
                return
            }

            if (!this.validarCorreo(emailString)) {
                this.error = "Se debe utilizar un correo del ITAM"
                return
            }

            if(this.psswd.trim().length < 6) {
                this.error = "La contraseña debe contener al menos 6 caracteres"
                return
            }

            const attrList = [];
            const emailAttribute = {
                Name: "email",
                Value: emailString,
            };
            const nameAttribute = {
                Name: "name",
                Value: datos.nombre,
            };
            const familyAttribute = {
                Name: "family_name",
                Value: datos.apellido,
            };
            const asesorAttribute = {
                Name: 'custom:Asesor',
                Value: (this.asesor === true ? 1 : 0).toString(),
            };
            attrList.push(new CognitoUserAttribute(emailAttribute));
            attrList.push(new CognitoUserAttribute(nameAttribute));
            attrList.push(new CognitoUserAttribute(familyAttribute));
            attrList.push(new CognitoUserAttribute(asesorAttribute));
            console.log(attrList)

            //TODO: ver por qué no funciona el catch
            try{
                //Intenta registrar al usuario
                await userPool.signUp(emailString, datos.passwd, attrList, null, (err, result ) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    this.error=""
                    console.log(result)

                    router.replace({
                        name: "Confirm",
                    });
                });
            } catch(err) { 
                if(err instanceof UsernameExistsException) {
                    this.error = "Ya hay una cuenta asociada a este correo"
                    return
                }
            }

        },

        //Migrar esto a validator.js
        validarCorreo(correo) {
            return correo.endsWith("@itam.mx")
        }
    },
}

</script>

<style>
.textBox {
    border-radius: 7px;
}
</style>
