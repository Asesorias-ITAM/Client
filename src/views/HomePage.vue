<template>

    <!--{{store.email}}-->

    <!--
    <div class="page-container">
        <div class="content">
            <div class="grid grid-cols-3 min-h-full">

            <div class="col-span-1 min-h-full">
            
            <div class="side-bar">
                <div class="grid grid-cols-7 bgfondo-dark-1">
                    <div class="col-span-1 min-h-[90.2vh] bg-verde-itam-2">
                        <div class="flex flex-col justify-items-center px-14 text-center text-2xl">
                            <div class="tabs">
                                <MenuButton text="Buscar" type="unPressed" class="mt-20"/>
                                <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                                <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                                <div class="my-48"></div>
                                <MenuButton text="Mi Perfil" type="unPressed" class=""/>
                                <MenuButton text="Cerrar Sesión" type="unPressed" @click="logout" class="mt-10"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="col-span-1 min-h-full">
            <div class="card-grid">
                
                <div class="card">
                    <div class="card-body">
                        <p>Collaboration between designers and developers.</p>
                    </div>
                </div>

                <router-view name="grid"></router-view>
                
            </div>
            </div>


            </div>
        </div>
    </div> 
    -->
    <div class="grid grid-cols-7 bgfondo-dark-1">
        <div class="sidebar col-span-1 min-h-[90.2vh] bg-verde-itam-2">
            <section class="flex flex-col justify-items-center px-14 text-center text-2xl">
                <MenuButton text="Buscar" type="unPressed" class="mt-20"/>
                <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                <div class="my-14"></div>
                <MenuButton text="Mi Perfil" type="unPressed" class=""/>
                <MenuButton text="Cerrar Sesión" type="unPressed" @click="logout" class="mt-10"/>
            </section>
        </div>
        
        <section class="card-grid col-span-6">
            <div class="grid grid-cols-4 gap-6">
                <article class="col-span-1 rounded-lg overflow-hidden bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1">
                    <div class="bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">
                        <h1 class="px-3 py-4 text-3xl font-bold">Economía I.</h1>
                    </div>
                    <h2 class="mx-3 my-5 text-xl">Juan Acosta.</h2>
                    <p  class="mx-3 my-5 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus lectus. 
                    Nullam sed augue eget elit viverra dignissim. Ut nec urna in.</p>
                    <footer></footer>
                </article>

                <article class="col-span-1 rounded-lg overflow-hidden bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1">
                    <div class="bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">
                        <h1 class="px-3 py-4 text-3xl font-bold">Ideas III.</h1>
                    </div>
                    <h2 class="mx-3 my-5 text-xl">Rosa Santillana.</h2>
                    <p  class="mx-3 my-5 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus lectus. 
                    Nullam sed augue eget elit viverra dignissim. Ut nec urna in.</p>
                </article>
                
            </div>
        </section>

        <router-view name="grid"></router-view>
            
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
.sidebar {
    max-width: 14rem;
}

.card-grid_ {
    padding-top: 2rem;
	padding-bottom: 6rem;
    display: grid;
	grid-template-columns: repeat(1, 1fr);
	column-gap: 1.5rem;
	row-gap: 1.5rem;
    flex-grow: 1;
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