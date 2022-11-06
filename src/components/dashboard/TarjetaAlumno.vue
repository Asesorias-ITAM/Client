<template>
    <section class="custom grid grid-cols-6 w-11/12 place-items-center text-center text-xl h-10 my-3 mx-auto border-2">
        <div class="col-span-3">{{datosAlumno.correo}}</div>
        <div class="col-span-3">{{datosAlumno.nombre +" " +datosAlumno.apellido}}</div>
        
    </section>
</template>
<script>

export default {
    name: "TarjetaAlumno",
    components: {},
    props: {
        datosAlumno: {
            type: Object,
            require: true
        }
    }
}
</script>
<style scoped>

.custom {
    @apply border-2 bg-fondo-light-1 hover:text-white hover:bg-verde-itam-2
} 

</style>
