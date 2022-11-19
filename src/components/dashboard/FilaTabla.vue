<template>
    <section class="grid grid-cols-6 w-11/12 place-items-center text-center text-xl h-10 my-3 mx-auto" :class="selected ? 'pressed' : 'unPressed'">
        <div class="col-span-3">{{col1}}</div>
        <div class="col-span-3">{{col2}}</div>
        
    </section>
</template>
<script>

export default {
    name: "FilaAlumno",
    
    props: {
        datosAlumno: {
            type: Object,
            require: true
        },
        col1: {
            type: String,
            required: true
        },
        col2: {
            type: String,
            required: true
        },
        selected:{
            type: Boolean,
            required: true
        }
    }
}
</script>
<style scoped>

.pressed{
    @apply text-white bg-verde-itam-2
}

.unPressed{
    @apply bg-fondo-light-1 hover:text-white hover:bg-verde-itam-2
}

</style>
