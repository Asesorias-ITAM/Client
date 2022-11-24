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
            <button class="px-2 py-1 mx-2.5 rounded-md bg-red-300 hover:bg-red-400 dark:bg-red-400 dark:hover:bg-red-500" @click="eliminar">Eliminar</button>
        </footer>
    <!-- </article> -->
    </article>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router"

export default {
    name: "TarjetaMisGrupos",
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
    components: {},
    methods: {
        // Agregar un botón de confirmación

        eliminar() {
            try {
                
                
                this.$toast.success(`Tu grupo se borró exitosamente`);
            } catch(error) {
                console.log(error)
            }
            //this.$emit('eliminarPublicacion', this.publicacion.id)
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

