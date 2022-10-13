import UpperBar from "@/components/UpperBar.vue";
import { mount } from "@vue/test-utils";

describe("UpperBar.vue",()=>{
    it("Escribe el nombre de la página", ()=>{
        const wrapper = mount(UpperBar);
        expect(wrapper.text()).toMatch("ASESORÍAS ITAM");
    })
} )