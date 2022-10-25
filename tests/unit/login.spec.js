import LoginPage from "@/views/LoginPage.vue";
import '@testing-library/jest-dom'
import {mount, shallowMount, RouterLinkStub} from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'

/*import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from "@/router/index.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})*/

describe("LoginPage", () =>{

    it("Saca error si no hay información en todos los campos", async () => {
        /*router.push('/') //Navegar a la página de login
        await router.isReady()*/

        const wrapper = mount(LoginPage, {
            global: {
              stubs: ["router-link"],
              plugins: [createTestingPinia()],

              /*plugins: { 
                testPinia: [createTestingPinia()], // Crea un pinia de prueba 
                r: [router] 
              },*/ 
            },
            data() {
              return {
                  incorrecto: true, // Hace que el field validator sea visible
              }
            },
        });
        
        const button = wrapper.find("[data-test='login-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']")
        expect(errorMSG.text()).toBe("Credenciales Incorrectas")
        expect(wrapper.findComponent({ name: "CustomLabel" })).toBeVisible
    })

    it("Saca error si no redirecciona al registro", async () => {
        const wrapper = shallowMount(LoginPage, {
            global: {
              //stubs: { "router-link": RouterLinkStub }, // Este no funciona, no sé por qué
              stubs: ["router-link"],
              plugins: [createTestingPinia()], // Crea un pinia de prueba
            },
            
        });

        const goToRegister = wrapper.find("[data-test='go-to-register']")
        //console.log(goToRegister.attributes().to)
        expect(goToRegister.attributes().to).toBe('/register')

    })

    
})