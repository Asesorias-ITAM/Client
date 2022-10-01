<template>
    <div class="grid grid-cols-7">
        <div class="col-span-1 min-h-[90.2vh] bg-verde-itam-2">
            <div class="flex flex-col justify-items-center px-14 text-center text-2xl">
                <div class=""></div>
                <MenuButton text="Buscar" type="unPressed" class="mt-20"/>
                <MenuButton text="Mis Asesores" type="unPressed" class="mt-10"/>
                <MenuButton text="Mis Grupos" type="pressed" class="mt-10"/>
                <div class="my-48"></div>
                <MenuButton text="Mi Perfi" type="unPressed" class=""/>
                <MenuButton text="Cerrar Sesión" type="unPressed" class="mt-10"/>
            </div>
        </div>
        <div class="col-span-6 min-h-[90.2vh]  bg-gris-itam-1">
            <router-view name="grid"></router-view>
        </div>

    </div>

</template>

<script>
import MenuButton from "@/components/shared/MenuButton"

export default {
    name: "HomePage",
    components: {MenuButton}
}

</script>

<style scoped>
*{
    border: 0px solid red;
}
</style>