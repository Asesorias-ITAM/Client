<template>
    <DirectorioAlumnos/>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

export default {
    name: "DirectorioPage",
    components : { DirectorioAlumnos: defineAsyncComponent(() => import("@/" + paths["DirectorioAlumnos"])) }
}
</script>