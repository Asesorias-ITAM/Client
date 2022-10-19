<template>
        <div class="grid grid-cols-3">
            <div class="col-span-1 min-h-full"></div>

            <div class="col-span-1 min-h-full">
                <div class="text-2xl subpixel-antialiased font-sans ">
                    <div class=" mt-16 border-4 bg-white drop-shadow-2xl">
                        <h2 class="text-center py-5 bg-verde-itam-1 text-white text-4xl font-bold"></h2>
                        <div id="registro" class="flex flex-col mx-14 mb-2">
                            
                            <CustomLabel data-test="field-validator" class="bad" :text="error" v-if="error!==''"/>

                            <label class="mt-2">Correo Electrónico</label>
                            <TextInput v-model="correo" placeholder=""/>
                            
                            
                            <label id="test">Nombres(s)</label>
                            <TextInput v-model="nombre" placeholder=""/>
                            
                            
                            <label>Apellidos</label>
                            <TextInput v-model="apellido" placeholder=""/>

                            <label>Contraseña</label>
                            <TextInput type="password" v-model="psswd" placeholder=""/>

                            <label>Confirma Contraseña</label>
                            <TextInput type="password" v-model="psswd2" placeholder=""/>

                            <CustomLabel data-test="password_validator" class="bad" text="Las contraseñas no coinciden" v-if="!compara"/>
                            
                            <div class="grid grid-cols-1">
                                <div>
                                    <label>Quiero ser asesor </label>
                                    <input type="checkbox" v-model="asesor" class="mb-6">
                                </div>
                                <ActionButton data-test="register-button" text="Crear cuenta" @click="registrar" type="primary" :disabled="!compara"/>
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

import {validateRegisterForm } from "@/utils/validator.js"

import { useUserStore } from '@/stores/user.js'
//Código de Registro adaptado de https://github.com/aws-samples/amazon-cognito-vue-workshop/blob/main

import { useRouter } from "vue-router";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { POOL_DATA } from "@/config/cognito.js";

//get access to Vuex router
let router;
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
        router = useRouter();
        const store = useUserStore()
        return {
            // you can return the whole store instance to use it in the template
            store
        }
    },
    computed: {
        compara(){
            return this.psswd===this.psswd2
        }
    },

    methods:{
        async registrar() {
            let emailString = this.correo.toLowerCase()

            if(await this.store.checkUser({"correo" :emailString})){
                this.error="Ya existe un usuario con ese correo"
                return
            }

            const datos = {
                correo: emailString,
                nombre: this.nombre,
                apellido: this.apellido,
                passwd: this.psswd,
            }

            let validation = validateRegisterForm(datos)

            if (!validation[0]){
                this.error=validation[1]
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

            await userPool.signUp(emailString, datos.passwd, attrList, null, (err, /*result*/ ) => {
                if (err) {
                    console.log(err)

                    return
                }
                this.error=""
                const newUser = {"nombre": nameAttribute.Value,
                    "apellido": familyAttribute.Value, 
                    "correo": emailAttribute.Value, 
                    "asesor": asesorAttribute.Value, 
                    "confirmed": false}

                this.store.addUser(newUser)
                //console.log(result)
                //Llamo a la api y creo el nuevo usuario sin ser confirmado
                //Call API add
                
                router.replace({
                    name: "Confirm",
                });
            });

        },

    },
}

</script>

