import RegisterPage from "@/views/RegisterPage.vue";
//import ActionButton from "@/components/shared/ActionButton";
//import TextInput from "@/components/shared/TextInput";
//import CustomLabel from "@/components/shared/CustomLabel";

import {mount, RouterLinkStub} from "@vue/test-utils";

describe("RegisterPage", () =>{
    
    it("Saca error si no hay información en todos los campos", async () =>{
        const wrapper = mount(RegisterPage, {
            global: {
              stubs: { "router-link": RouterLinkStub },
            },
        });
        
        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("Todos los campos deben contener información")

    })

    it("Saca error si la contraseña no es mínimo 6 caracteres", async () =>{
        const wrapper = mount(RegisterPage, {
            global: {
              stubs: { "router-link": RouterLinkStub },
            },
            
        });
        await wrapper.setData({
            
            nombre: "Corlys",
            apellido: "Velaryon",
            psswd: "l",
            correo: "hello@gmail.com", 

        })

        console.log(wrapper.vm.psswd)
        const button = wrapper.find("[data-test='register-button']");
        await button.trigger("click");
        const errorMSG = wrapper.find("[data-test='field-validator']");
        expect(errorMSG.text()).toBe("La contraseña debe ser al menos 6 caracteres")

    })
})