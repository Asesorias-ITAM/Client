<template>
        <div class="grid grid-cols-3 min-h-full">
            <div class="col-span-1 min-h-full"></div>
            <div class="col-span-1 min-h-full">
                <div class="text-2xl subpixel-antialiased font-sans">

                    <div class=" mt-20 border-4">
                        <h2 class="text-center py-5 bg-verde-itam-1 text-white text-4xl font-bold">Regístrate</h2>
                        <div id="registro" class="flex flex-col mx-14 ">
                            
                            <label class="mt-6">Correo Electrónico</label>
                            <input id="" v-model="correo" placeholder="Correo" class="mb-6 border-4">
                            <label>Nombres(s)</label>
                            <input id="" v-model="correo" placeholder="Correo" class="mb-6 border-4">
                            <label>Apellidos</label>
                            <input id="" v-model="correo" placeholder="Correo" class="mb-6 border-4">
                            <label>Contraseña</label>
                            <input id="" v-model="correo" placeholder="Correo" class="mb-6 border-4">
                            <label>Confirma Contraseña</label>
                            <input id="" v-model="correo" placeholder="Correo" class="mb-6 border-4">
                            <div class="grid grid-cols-1">
                                <div>
                                    <label>Quiero ser asesor </label>
                                    <input id="" type="checkbox" v-model="correo" placeholder="Correo" class="mb-6">
                                </div>
                                <button class="mb-3 rounded-full bg-verde-itam-2 text-white">Crear cuenta</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1 min-h-full"></div>
        </div>
</template>

<script>

export default{
    name: "RegisterPage",
    data(){
        return {
            nombre: "",
            apellido: "",
            passwd: "",
            passwd2: "",
            correo: "",
            asesor:0
        }
    }
}

</script>
<style scoped>


</style>
