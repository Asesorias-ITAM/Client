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
            v-if="pertenencia==='general'">
                Inscribirme
            </button>
            <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark"
                @click="dejar"
                v-if="pertenencia==='asesores'">
                Dejar grupo
            </button>
            <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2 hover:bg-card-button-hover dark:hover:bg-card-button-hover-dark"
                @click="borrar"
                v-if="pertenencia==='publicaciones'">
                Borrar
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
        pubLink() {
            return `/home/${this.grupo.id}`
        },
        pertenencia() {
            try {
                if(this.store.groupIDs.has(this.grupo.id)){
                    return "asesores"
                }else if(this.store.pubsIDs.has(this.grupo.id)){
                    return "publicaciones"
                }else{
                    return "general"
                }       
            } catch {
                return false
            }
            
        }
    },
    components: {},
    methods: {
        ver_curso() {
            //console.log(this.publicacion)
            this.store.selectGrupo(this.grupo)
            console.log(this.grupo.descripcion)
        },
        async inscribir() {
            try {
                await this.store.inscribirGrupo(this.grupo.id)
                await this.store.getAsesores()
                this.$toast.success(`Inscripci??n exitosa`);
            } catch(error) {
                console.log(error)
            }
            this.$emit("change", this.grupo.id)
            
        },
        async dejar() {
            try{
                await this.store.dejarGrupo(this.grupo.id)
                await this.store.getAsesores()
                this.$toast.success(`Salida exitosa`);
            }catch(error){
                console.log(error)
            }
            
            this.$emit("change", this.grupo.id)
        },
        async borrar() {
            try{
                await this.store.eliminarPublicacion(this.grupo.id)
                await this.store.getGrupos()
                this.$toast.success(`Borrado exitoso`);
                //console.log("Publicaci??n a eliminar: "+this.grupo.id)
            }catch(error){
                console.log(error)
            }
            
            this.$emit("change", this.grupo.id)
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
    min-width: 17.5rem;
    max-width: 17.5rem;
}
</style>

