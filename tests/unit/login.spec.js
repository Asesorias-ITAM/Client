import LoginPage from "@/views/LoginPage.vue";
import CustomLabel from '@/components/shared/CustomLabel'
import {mount, shallowMount, RouterLinkStub} from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'

describe("LoginPage", () =>{

    it("Saca error si no hay información en todos los campos", async () => {
        const wrapper = mount(LoginPage, {
            global: {
              stubs: ["router-link"],
              plugins: [createTestingPinia()], // Crea un pinia de prueba
              data() {
                return {
                    incorrecto: true,
                }
              },
            },
        });
        
        const button = wrapper.find("[data-test='login-button']");
        await button.trigger("click");
        //const errorMSG = wrapper.find("[data-test='field-validator']")
        //const errorMSG = wrapper.find("[class='bad']")
        const errorMSG = wrapper.findAll('CustomLabel')
        //const errorMSG = wrapper.findAll('TextInput')
        console.log(errorMSG)
        //expect(errorMSG.text()).toBe("Credenciales Incorrectas")
        expect(wrapper.findComponent({ name: "CustomLabel" }).exists()).toBe(true)
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