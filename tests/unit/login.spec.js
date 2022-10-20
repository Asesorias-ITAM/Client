import LoginPage from "@/views/LoginPage.vue";
import {mount, shallowMount, RouterLinkStub} from "@vue/test-utils";

describe("LoginPage", () =>{
    /*it("Saca error si no hay información en todos los campos", async () => {
        const wrapper = mount(LoginPage, {
            global: {
              stubs: ["router-link"],
            },
        });
        
        const button = wrapper.find("[data-test='login-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Credenciales Incorrectas")
    })*/

    it("Saca error si no redirecciona al registro", async () => {
        const wrapper = mount(LoginPage, {
            global: {
              //stubs: { "router-link": RouterLinkStub }, // Este no funciona, no sé por qué
              stubs: ["router-link"],
            },
            
        });

        const goToRegister = wrapper.find("[data-test='go-to-register']")
        //console.log(goToRegister.attributes().to)
        expect(goToRegister.attributes().to).toBe('/register')

    })

    
})