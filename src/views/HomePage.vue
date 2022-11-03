<template>
    <!--{{store.email}}-->

    <div class="grid grid-cols-7 bgfondo-dark-1">
        <div class="sidebar col-span-1 min-h-[90.2vh] bg-verde-itam-2">
            <section class="flex flex-col justify-items-center px-14 text-center text-2xl">
                <MenuButton text="Buscar" type="unPressed" class="mt-20"/>
                <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                <MenuButton text="Mis Asesorías" type="unPressed" class="mt-10"/>
                <MenuButton text="Mi Perfil" type="unPressed" class="mt-10"/>
                <MenuButton text="Cerrar Sesión" type="unPressed" @click="logout" class="mt-10"/>
            </section>
        </div>
        
        <section class="card-grid col-span-6">
            <div class="grid grid-cols-4 gap-6">
                <PublicationCard v-for="pub of pub_list" v-bind="pub"/>
            </div>
        </section>

        <router-view name="grid"></router-view>
            
    </div>
</template>

<script>
import MenuButton from "@/components/shared/MenuButton.vue"
import PublicationCard from "@/components/PublicationCard.vue"
import { useUserStore } from '@/stores/user.js'
import { useRouter } from "vue-router"
let router
let placeholder_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus lectus. Nullam sed augue eget elit viverra dignissim. Ut nec urna in."

export default {
    name: "HomePage",
    components: {MenuButton, PublicationCard},
    setup() {
        router = useRouter();
        const store = useUserStore()
        return {
            // you can return the whole store instance to use it in the template
            store
        }
    },
    data() {
        return {
            /*pub: {materia: "Economía I", asesor: "Juan Acosta", desc: placeholder_desc},*/
            pub_list: [{materia: "Economía I", asesor: "Juan Acosta", desc: placeholder_desc},
                       {materia: "Ideas III", asesor: "Rosa Sarmiento", desc: placeholder_desc},
                       {materia: "SCE", asesor: "POJO", desc: placeholder_desc},
                       {materia: "OPC", asesor: "Don Ramón", desc: placeholder_desc},
                       {materia: "Redes I", asesor: "1ms", desc: placeholder_desc},
                      ],
        }
    },
    /* beforeCreate(){
        if (this.store.session === null){
            router.replace({
                name: "Login",
            });
        }
    }, */
    
    methods: {
        logout() {
            this.store.logout(); 
            this.store.$reset()
            console.log(this.store.session)
            router.replace({
                name: "Login",
            });
        }
    }
}
</script>

<style scoped>
.sidebar {
    max-width: 14rem;
}

.border { 
    border-color: red;
}

.card_ {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--c-background-primary);
    box-shadow: 0 3px 3px 0 rgba(#000, 0.05), 0 5px 15px 0 rgba(#000, 0.05);
    border-radius: 8px;
    transition: 0.3s;
    width: 40%;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card-grid {
	padding: 1rem 2rem;
	font-size: 0.875rem;
    overflow: hidden;
}

.card {
    border-radius: 0.375rem;
}
.card-footer {
	padding: 1rem 1rem;
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid var(#efefef);
}


.temp {
    display: grid;
    grid-template-columns: minmax(min-content, 175px) minmax(max-content, 1fr) minmax(
        max-content,
        400px
    );
    width: 90%;
	max-width: 1280px;
	margin-left: auto;
	margin-right: auto;
	column-gap: 4rem;
	align-items: flex-end;
    @media (max-width: 1200px) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--c-gray-600);
	}
}

</style>