<template>
    <header>
        <div class="flex justify-center items-center w-full h-[10vh] bg-verde-itam-1">
            <div class="text-center" style="display: inline-block;">
                <h1 class="text-texto-light-2 text-7xl font-bold">ASESORÍAS ITAM</h1>
            </div>
            <div class="mb-7 relative left-80">
                <ThemeButton/>
            </div>
        </div>
    </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

export default{
    name: "UpperBar",
    components: { ThemeButton: defineAsyncComponent(() => import("@/" + paths["ThemeButton"])) },
}
</script>

<style scoped>
.theme-button-container {
  /*padding: 0rem 2rem;*/
  position: absolute; /* usar fixed para mantener el botón en la página aunque nos movamos hacia abajo*/
  top: 32px;
  right: 200px;
  height: 30px;
  width: 50px;
  text-align: right;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background-color: var(--background-color-secondary);
}

</style>