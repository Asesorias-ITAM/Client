<template>
    <div>
      <input
        @change="toggleTheme"
        id="checkbox"
        type="checkbox"
        class="switch-checkbox"
      />
      <label for="checkbox" class="switch-label">
        <span>🌙</span>
        <span>☀️</span>
        <div
          class="switch-toggle"
          :class="{ 'switch-toggle-checked': userTheme === 'dark' }"
        ></div>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    name:"ThemeButton",
    mounted() {
      const initUserTheme = this.getTheme() || this.getMediaPreference();
      this.setTheme(initUserTheme);
    },
  
    data() {
      return {
        userTheme: "light",
      };
    },
  
    methods: {
      toggleTheme() {
        const activeTheme = localStorage.getItem("user-theme");
        if (activeTheme === "light") {
          this.setTheme("dark");
        } else {
          this.setTheme("light");
        }
      },
  
      getTheme() {
        return localStorage.getItem("user-theme");
      },
  
      setTheme(theme) {
        localStorage.setItem("user-theme", theme);
        this.userTheme = theme;
        document.documentElement.className = theme;
      },
  
      getMediaPreference() {
        const hasDarkPreference = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (hasDarkPreference) {
          return "dark";
        } else {
          return "light";
        }
      },
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .switch-checkbox {
    display: none;
  }
  
  .switch-label {
    align-items: center;
    background: var(--text-primary-color);
    /*border: calc(var(--element-size) * 0.025) solid var(--accent-color);*/
    border-radius: var(--element-size);
    cursor: pointer;
    display: flex;
    font-size: calc(var(--element-size) * 0.3);
    height: calc(var(--element-size) * 0.55); 
    position: relative;
    padding: calc(var(--element-size) * 0.1);
    transition: background 0.5s ease;
    justify-content: space-between;
    width: calc(var(--element-size) * 1.07);
    z-index: 1;
  }
  
  .switch-toggle {
    position: absolute;
    background-color: var(--background-color-primary);
    border-radius: 50%;
    top: calc(var(--element-size) * 0.17);
    left: calc(var(--element-size) * 0.15);
    height: calc(var(--element-size) * 0.4);
    width: calc(var(--element-size) * 0.4);
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
  }
  
  .switch-toggle-checked {
    transform: translateX(calc(var(--element-size) * 0.6)) !important;
  }
  </style>
  