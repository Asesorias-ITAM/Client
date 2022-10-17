<template>
    <button type="button" @click="toggleDark()" class="switch-label bg-boton-tema-light dark:bg-boton-tema-dark"> <!--"bg-slate-800 dark:bg-slate-400 rounded"-->
        <label class="btn-lbl"> <!--"inline-block"--> <!--"switch-label"-->
            <div class="moon"> <img src="../assets/Moon_icon3.svg"/> </div>
            <div class="sun"> <img src="../assets/Sun_icon3.svg"/> </div>
        </label>

        <div
          class="switch-toggle bg-slate-300 dark:bg-slate-800"
          :class="{ 'switch-toggle-checked': isDark }"
        ></div>
    </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>
.btn-lbl {
  display: inline-block;
}

:root {
  --pos-y: 0.03;
}

.moon {
  position: absolute;
  top: calc(var(--element-size) * var(--pos-y));
  left: calc(var(--element-size) * 0.04);
  cursor: pointer;
}

.sun {
  position: absolute;
  top: calc(var(--element-size) * (var(--pos-y) + 0.033));
  left: calc(var(--element-size) * 0.655); /*0.67*/
  cursor: pointer;
}

/*Formato del fondo del botón*/
.switch-label {
  align-items: right;
  /*--tw-bg-opacity: 1;
  background-color: rgb(148 163 184 / var(--tw-bg-opacity));/*var(--text-primary-color);*/
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  border-radius: var(--element-size);
  color: slate-400;
  cursor: pointer;
  display: flex; /*inline-block*/ 
  font-size: calc(var(--element-size) * 0.46);
  height: calc(var(--element-size) * 0.55); 
  position: absolute;
  padding: calc(var(--element-size) * 0.1);
  transition: background 0.5s ease;
  justify-content: space-between;
  width: calc(var(--element-size) * 1.177);
  z-index: 1;
}

/*Formato del círculo que se mueve*/
.switch-toggle {
  position: absolute;
  border-radius: 50%;
  top: calc(var(--element-size) * (var(--pos-y) + 0.014));
  left: calc(var(--element-size) * 0.065);
  height: calc(var(--element-size) * 0.46);
  width: calc(var(--element-size) * 0.46);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

/*Animación*/
.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.59)) !important;
}
</style>
