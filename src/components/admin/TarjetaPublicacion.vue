<template>
    <article class="col-span-1 min-w-8 min-h-48 rounded-lg overflow-hidden shadow-md bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1">
        <div class="bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">
            <h1 class="px-3 py-4 text-3xl font-bold">{{publicacion.materia}}</h1>
        </div>
        <h2 class="mx-3 my-5 text-xl">{{"Dada por: "+publicacion.alumno.nombre + " "+ publicacion.alumno.apellido}}</h2>
        <p  class="mx-3 my-5 text-base">{{publicacion.descripcion}}</p>
        <footer class="card-footer">
            <button class="px-2 py-1 mx-2.5 rounded-md bg-red-400 dark:bg-fondo-dark-tarjeta-2" @click="eliminar">Eliminar</button>
        </footer>
    </article>
</template>

<script>
export default {
    name: "TarjetaPublicacion",
    props: {
        publicacion:{
            type: Object,
            require: true
        },
        
    },
    components: {},
    methods: {
        eliminar() {
            this.$emit('eliminarPublicacion', this.publicacion.id)
        },
    },
}

</script>

<style scoped>
.card-footer {
	padding: 1rem 1rem;
	/*display: flex;*/
	justify-content: flex-start;
	border-top: 1px solid var(#efefef);
    
}
</style>

