<template>
    <article class="col-span-1 min-w-8 min-h-48 rounded-lg overflow-hidden shadow-md bg-fondo-tarjeta-1 dark:bg-fondo-dark-tarjeta-1">
        <div class="bg-fondo-tarjeta-2 dark:bg-fondo-dark-tarjeta-2">
            <h1 class="px-3 pt-4 pb-2 text-3xl font-bold">
                {{alumno.nombre+ " "+alumno.apellido}}
            </h1>
            <h2 class="mx-3 mb-3 text-xl">{{alumno.correo}}</h2>
            <h3 class="mx-3 text-xl" v-if="alumno.telefono!==null">{{alumno.telefono}}</h3>
        </div>
        <h3 class="mx-3 my-5 text-xl">{{"Asesor: "+ (alumno.asesor ? "Si" : "No")}}</h3>
        <h3 class="mx-3 mt-5 text-xl" v-if="alumno.carrera.length>0">{{"Estudia: "}}</h3>
        <h4 v-for="carrera in alumno.carrera" :key="carrera"> {{carrera}}</h4>
        
        
        <footer class="card-footer">
            
        </footer>   
    </article>
</template>

<script>
export default {
    name: "TarjetaAlumno",
    props: {
        alumno: {
            type: Object,
            require: true
        }
    }
    
}
</script>