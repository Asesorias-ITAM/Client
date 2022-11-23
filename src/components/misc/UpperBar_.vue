<template>
    <header class="flex">
        <div class="titulo  w-full h-[10vh] bg-verde-itam-1">
            <!-- <img class="logo" src="@/assets/logo.svg"/> -->
            <!-- <img class="logo-bg" src="@/assets/logo_bg.svg"/> -->
            <h1 class="text-center justify-center items-center text-texto-light-2 text-7xl font-bold">ASESORÍAS ITAM</h1>
            <div class="theme-button mb-7 flex-row justify-center items-center min-w-full min-h-full">
                <ThemeButton/>
            </div>
        </div>
    </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

export default{
    name: "UpperBar_",
    components: { ThemeButton: defineAsyncComponent(() => import("@/" + paths["ThemeButton"])) },
}
</script>

<style lang="scss" scoped>
.titulo {
    display: inline-block;
    flex: 1 0 auto;
    overflow: hidden;

    .theme-button {
        flex: 1 2 auto;
        flex-flow: column;
        max-height: 2rem;
    }
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