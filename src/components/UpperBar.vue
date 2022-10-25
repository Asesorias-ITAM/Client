<template>
    <header>
        <div class="flex justify-center items-center w-full h-24 bg-verde-itam-1">
            <div class="text-center" style="display: inline-block;">
                <h1 class="text-texto-light-2 text-7xl font-bold">ASESORÍAS ITAM</h1>
            </div>
            <div class="card" >
                <ThemeButton/>
            </div>
        </div>
    </header>
</template>

<script>

import ThemeButton from '@/components/ThemeButton.vue'; 

export default{
    name: "UpperBar",
    components: { ThemeButton },
}

</script>

<style>
html.dark {
  color-scheme: dark;
}

/*body {
    /*@apply bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-50;
}*/

:root {
    /*--background-color-primary: #ebebeb;*/
    /*--text-primary-color: #222;*/
    /*--background-color-secondary: #fafafa;
    --accent-color: #cacaca;*/
    --element-size: 4rem;
    /*position:sticky;*/
}

/*:root.isDark {
/*--background-color-primary: #1e1e1e;*/
/*--text-primary-color: #ddd;*/
/*--background-color-secondary: #2d2d30;
--accent-color: #3f3f3f;
}*/

.card {
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