<template>
    <div class="grid grid-cols-7 bgfondo-dark-1">
        <div class="page_container">
            <div class="col-span-1 min-h-[90.2vh] bg-verde-itam-2">
                <div class="flex flex-col justify-items-center px-14 text-center text-2xl">
                    <div class=""></div>
                    <MenuButton text="Buscar" type="unPressed" class="mt-20"/>
                    <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                    <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                    <div class="my-48"></div>
                    <MenuButton text="Mi Perfil" type="unPressed" class=""/>
                    <MenuButton text="Cerrar Sesión" type="unPressed" @click="logout" class="mt-10"/>
                </div>
            </div>
            <div class="col-span-6 min-h-[90.2vh]">
                <router-view name="grid"></router-view>
                <div class="card_container">
                    <div class="card">
                        <div class="content">
                            <span>Jane Doe</span> 
                            <span>Interior Designer</span> 
                        </div>
                    </div>
                </div>
                <!--{{store.email}}-->
            </div>
        </div>
    </div>

</template>

<script>
import MenuButton from "@/components/shared/MenuButton"

import { useUserStore } from '@/stores/user.js'
import { useRouter } from "vue-router";

let router;

export default {
    name: "HomePage",
    components: {MenuButton},
    setup(){
        router = useRouter();
        const store = useUserStore()
        return {
            // you can return the whole store instance to use it in the template
            store
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
        logout(){
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
*{
    border: 0px solid red;
}

.page_container {
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

.card {
    @media (max-width: 1200px) {
		display: none;
	}
  position:relative;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;
}

.card_container {
    display: grid;
    grid-gap: 35px;
    margin: 0 auto;
    padding: 0px 40px;
    
}
</style>