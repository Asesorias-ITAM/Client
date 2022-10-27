import RegisterPage from "@/views/RegisterPage.vue";
import {mount, /*RouterLinkStub*/} from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'

describe("RegisterPage", () =>{
    
    it("Saca error si no hay información en todos los campos", async () => {
        const wrapper = mount(RegisterPage, {
            global: {
                //stubs: { "router-link": RouterLinkStub }, // Este no funciona, no sé por qué
                stubs: ["router-link"],
                plugins: [createTestingPinia()],
            },
        });
        
        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Todos los campos deben contener información")

    })

    it("Saca error si el correo no es del ITAM", async () => {
        const wrapper = mount(RegisterPage, {
            global: {
                //stubs: { "router-link": RouterLinkStub }, // Este no funciona, no sé por qué
                stubs: ["router-link"],
                plugins: [createTestingPinia()],
            },
        });
        await wrapper.setData({
            
            nombre: "Corlys",
            apellido: "Velaryon",
            psswd: "contra123",
            correo: "test@gmail.com", 

        })

        //console.log(wrapper.vm.psswd)
        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Se debe utilizar un correo del ITAM")

    })

    it("Saca error si la contraseña no contiene mínimo 6 caracteres", async () => {
        const wrapper = mount(RegisterPage, {
            global: {
                //stubs: { "router-link": RouterLinkStub }, // Este no funciona, no sé por qué
                stubs: ["router-link"],
                plugins: [createTestingPinia()],
            },
        });
        await wrapper.setData({
            
            nombre: "Corlys",
            apellido: "Velaryon",
            psswd: "l",
            correo: "test@itam.mx", 

        })

        //console.log(wrapper.vm.psswd)
        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("La contraseña debe contener al menos 6 caracteres")

    })
    
    it("Saca error si no redirecciona al login", async () => {
        const wrapper = mount(RegisterPage, {
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

    /*
    // TODO
    it("TODO: Saca error si el correo ya está registrado", async () => {
        const wrapper = mount(RegisterPage, {});
        await wrapper.setData({
            
            nombre: "Corlys",
            apellido: "Velaryon",
            psswd: "contra",
            correo: "test@itam.mx", 

        })

        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        console.log(wrapper.vm.psswd);
        await button.trigger("click"); // Intenta registrarse dos veces
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Ya hay una cuenta asociada a este correo")

    }) */
})