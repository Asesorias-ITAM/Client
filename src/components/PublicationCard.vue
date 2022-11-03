<template>
    <article class="col-span-1 min-h-48 rounded-lg overflow-hidden bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1">
        <div class="bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">
            <h1 class="px-3 py-4 text-3xl font-bold">{{materia}}</h1>
        </div>
        <h2 class="mx-3 my-5 text-xl">{{asesor}}</h2>
        <p  class="mx-3 my-5 text-base">{{desc}}</p>
        <footer class="card-footer">
            <button class="px-2 py-1 mx-2.5 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">Ver curso</button>
            <button class="px-2 py-1 rounded-md bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">Inscribirme</button>
        </footer>
    </article>
</template>

<script>
export default {
    name: "PublicationCard",
    props: {
        materia: {
            type: String,
            require: true,
        },
        asesor: {
            type: String,
            require: true,
        },
        desc: {
            type: String,
            require: true,
        },
    },
    components: {},
    methods: {
        ver_curso() {

        },
        inscribir() {

        },
    },
}

</script>

<style scoped>
.card-footer {
	padding: 1rem 1rem;
	display: flex;
	justify-content: flex-end;
	border-top: 1px solid var(#efefef);
}
</style>

