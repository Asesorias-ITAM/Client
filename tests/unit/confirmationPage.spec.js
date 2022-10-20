import ConfirmationPage from "@/views/ConfirmationPage.vue";
import {mount, shallowMount, RouterLinkStub} from "@vue/test-utils";

describe("ConfirmationPage", () =>{
    
    it("Saca error si no hay información en todos los campos", async () => {
        const wrapper = mount(ConfirmationPage, {
            global: {
              stubs: ["router-link"],
            },
        });
        
        const button = wrapper.find("[data-test='confirm-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Todos los campos deben contener información")

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
            },
            
        });

        const backToLogin = wrapper.find("[data-test='back-to-login']")
        //console.log(backToLogin.attributes().to)
        expect(backToLogin.attributes().to).toBe('/')

    })

})