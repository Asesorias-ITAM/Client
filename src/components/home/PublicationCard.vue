<template>
    <article class="min-h-48 h-70 customcard rounded-lg overflow-hidden shadow-md bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1">
    <!-- <article class="m-3 min-w-8 max-w-md min-h-48 rounded-lg overflow-hidden shadow-md bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1"> -->
        <div class="bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 h-28">
            <h1 class="px-3 pt-6 text-3xl font-bold">{{grupo.materia}}</h1>
        </div>
        <h2 class="mx-3 my-2 text-xl">{{grupo.alumno.nombre + " " + grupo.alumno.apellido}}</h2>
        <div class="h-16 overflow-auto">
            <p  class="mx-3 my-5 text-base">{{grupo.descripcion}}</p>
        </div>
        
        <footer class="h-38 card-footer">
            
            <router-link :to="pubLink" class="px-2 py-1 mx-2.5 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark" @click="ver_curso">
                Ver curso
            </router-link>
            <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark" 
            @click="inscribir"
            v-if="!pertenece">
                Inscribirme
            </button>
            <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark"
                @click="dejar"
            v-else>
                Dejar grupo
                </button>
            
        
        </footer>
    <!-- </article> -->
    </article>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router"


export default {
    name: "PublicationCard",
    setup() {
        const router = useRouter()
        const store = useUserStore()
        
        return {
            store,
            router
        }
    },
    props: {
        grupo:{
            type: Object,
            require: true
        },
    },
    computed:{
        pubLink(){
            return `/home/${this.grupo.id}`
        },
        pertenece(){
            return this.store.groupIDs.has(this.grupo.id)
        }
    },
    components: {},
    methods: {
        ver_curso() {
            //console.log(this.publicacion)
            this.store.selectGrupo(this.grupo)

        },
        async inscribir() {
            try{
                await this.store.inscribirGrupo(this.grupo.id)
                this.listaAsesores = await this.store.getAsesores()
                this.$toast.success(`Inscripción exitosa`);
            }catch(error){
                console.log(error)
            }
            this.$emit("inscribirse", this.grupo.id)
            
        },
        async dejar() {
            try{
                await this.store.dejarGrupo(this.grupo.id)
                this.listaAsesores = await this.store.getAsesores()
                this.$toast.success(`Salida exitosa`);
            }catch(error){
                console.log(error)
            }
            this.$emit("dejar", this.grupo.id)
            
        },
    },
}

</script>

<style scoped>
.card-footer {
	padding: 1rem 1rem;
	display: flex;
	justify-content: flex-center;
	border-top: 1px solid var(#efefef);
}

.customcard{
    width: 20rem; 
    min-width: 19rem;
    max-width: 19rem;
}
</style>

