<template>
        <div class="container min-h-full max-w-lg mx-auto">
            <div class="text-2xl subpixel-antialiased font-sans ">
                <div class=" mt-16 border-4 border-borde-light-1 dark:border-borde-dark-1 bg-fondo-light-1 dark:bg-fondo-dark-2 drop-shadow-2xl w-3/6 mx-auto">
                    <h2 class="text-center py-5 bg-verde-itam-1 text-fondo-light-1 text-4xl font-bold"></h2>
                    <div id="registro" class="flex flex-col mx-14 mb-2">
                        
                        <CustomLabel data-test="field-validator" class="bad" :text="error" v-if="error!==''"/>

                        <label class="mt-2">Correo Electrónico</label>
                        <TextInput v-model="correo" @keyup.enter="onEnter"/>
                        
                        <label>Nombre(s)</label>
                        <TextInput v-model="nombre" @keyup.enter="onEnter"/>
                        
                        <label>Apellidos</label>
                        <TextInput v-model="apellido" @keyup.enter="onEnter"/>

                        <label>Contraseña</label>
                        <TextInput type="password" v-model="psswd" @keyup.enter="onEnter"/>

                        <label>Confirma Contraseña</label>
                        <TextInput type="password" v-model="psswd2" @keyup.enter="onEnter"/>

                        <CustomLabel data-test="password_validator" class="bad" text="Las contraseñas no coinciden" v-if="!compara"/>
                        
                        <div class="grid grid-cols-1">
                            <div>
                                <label>Quiero ser asesor </label>
                                <input type="checkbox" v-model="asesor" class="mb-6">
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

</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import {validateRegisterForm } from "@/utils/validator.js"
import { useUserStore } from '@/stores/user.js'
//Código de Registro adaptado de https://github.com/aws-samples/amazon-cognito-vue-workshop/blob/main
import { useRouter } from "vue-router"
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js"
import { POOL_DATA } from "@/config/cognito.js"

/*  
Create a user pool object
The object parameter references the Cognito user pool data held in a constant that we 
setup in the Configure application to use Cognito User Pool section
*/
const userPool = new CognitoUserPool(POOL_DATA)

export default {
    name: "RegisterPage",
    components: {
        ActionButton: defineAsyncComponent(() => import("@/" + paths["ActionButton"])), 
        TextInput: defineAsyncComponent(() => import("@/" + paths["TextInput"])),
        CustomLabel: defineAsyncComponent(() => import("@/" + paths["CustomLabel"])),
    },
    data() {
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
        const router = useRouter()
        const store = useUserStore()

        return {
            store,
            router
        }
    },
    computed: {
        compara() {
            return this.psswd===this.psswd2
        }
    },

methods:{
    onEnter() {
        // Presionar enter para registrarse
        this.registrar()
    },
    async registrar() {
        let emailString = this.correo.toLowerCase()
         
        if(await this.store.checkUser({"correo" :emailString})) {
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
        
        if (!validation[0]) {
            this.error=validation[1]
            return
        }

        const attrList = []
        const emailAttribute = {
            Name: "email",
            Value: emailString,
        }
        const nameAttribute = {
            Name: "name",
            Value: datos.nombre,
        }
        const familyAttribute = {
            Name: "family_name",
            Value: datos.apellido,
        }
        const asesorAttribute = {
            Name: 'custom:Asesor',
            Value: (this.asesor === true ? 1 : 0).toString(),
        }
        attrList.push(new CognitoUserAttribute(emailAttribute))
        attrList.push(new CognitoUserAttribute(nameAttribute))
        attrList.push(new CognitoUserAttribute(familyAttribute))
        attrList.push(new CognitoUserAttribute(asesorAttribute))
        
        await userPool.signUp(emailString, datos.passwd, attrList, null, (err, /*result*/ ) => {
            if (err) {
                console.log(err)
                return
            }
            
            this.error=""
            const newUser = {"nombre": nameAttribute.Value,
                "apellido": familyAttribute.Value, 
                "correo": emailAttribute.Value, 
                "asesor": this.asesor, 
                "confirmed": false
            }
                      
            this.store.crearAlumno(newUser)
            
            //Llamar a la api y crear el nuevo usuario sin ser confirmado
            //Call API add
            
            this.router.replace({
                name: "Confirm",
            })
        })

    },

},
}

</script>
