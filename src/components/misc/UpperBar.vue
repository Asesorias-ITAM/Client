<template>
    <header>
        <div class="flex flex-initial flex-row justify-center items-center w-full h-[10vh] bg-verde-itam-1">
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

<style lang="scss" scoped>

.logo {
    position: absolute;

    //Azul: #2A5E9A
    filter: invert(33%) sepia(9%) saturate(5915%) hue-rotate(179deg) brightness(90%) contrast(84%);
    
    //Azul 2: #4283cf
    //filter: invert(63%) sepia(88%) saturate(1601%) hue-rotate(189deg) brightness(105%) contrast(109%);

    //Verde: #165F28
    //filter: invert(24%) sepia(81%) saturate(451%) hue-rotate(82deg) brightness(99%) contrast(93%);
}

.logo-bg {
    position: absolute;
    z-index: -1;

    // Blanco
    filter: saturate(100%) brightness(0%);
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(215deg) brightness(109%) contrast(102%); 
}

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