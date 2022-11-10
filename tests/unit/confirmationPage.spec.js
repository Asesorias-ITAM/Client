import ConfirmationPage from "@/views/ConfirmationPage.vue";
import '@testing-library/jest-dom'
import {mount, shallowMount, /*RouterLinkStub*/} from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'

describe("ConfirmationPage", () =>{
    
    it("Saca error si no hay información en todos los campos", async () => {
        const wrapper = mount(ConfirmationPage, {
            global: {
              stubs: ["router-link"],
              plugins: [createTestingPinia()],
            },
            data() {
                return {
                    error: "Código incorrecto"
                }
            }
        });
        
        const button = wrapper.find("[data-test='confirm-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Código incorrecto")

    })

    /*
    //TODO
    it("TODO: Saca error si el código es incorrecto", async () => {
        const wrapper = mount(ConfirmationPage, {});
        await wrapper.setData({
            
            correo: "test@itam.mx",
            codigo: "1234",

        })

        //console.log(wrapper.vm.psswd)
        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Se debe utilizar un correo del ITAM")

    })*/

    it("Saca error si no redirecciona al login", async () => {
        const wrapper = shallowMount(ConfirmationPage, {
            global: {
              //stubs: { "router-link": RouterLinkStub }, // Este no funciona, no sé por qué
              stubs: ["router-link"],
              plugins: [createTestingPinia()],
            },
            
        });

        const backToLogin = wrapper.find("[data-test='back-to-login']")
        //console.log(backToLogin.attributes().to)
        expect(backToLogin.attributes().to).toBe('/')

    })

})