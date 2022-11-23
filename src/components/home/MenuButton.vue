<template>
    <router-link :to="destination" :class="buttonClass" :img="img" class="menu-button text-white font-bold hover:bg-menu-button-hover">
        <img :src="imgPath" :fill="this.imgColor" class="pr-2"/> 
        {{ text }}
    </router-link >
</template>

<script>
export default {
    name: "RouterButton",
    data() {
        return {
            imgColor: "#000000",
        }
    },
    props: {
        text: {
        type: String,
        required: true,
        },
        type: {
        type: String,
        required: false,
        default: "unPressed",
        validator(value) {
            return ["unPressed", "pressed"].includes(value);
        },
        },
        destination: {
        type: String,
        default: "",
        required: false
        },
        img: {
        type: String,
        default: "",
        required: false
        }
    },
    computed: {
        buttonClass() {
        return {
            [this.type]: true, //[this.type] permite que guarde el valor de la variable como llave
        }
        },
        imgPath() {
        // Carga la imagen
        if (this.img !== '') {
            return require(`@/assets/${this.img}`);
        }
        }
    },
}
</script>

<style lang="scss" scoped>
img {
    filter: brightness(0%) saturate(100%); // Vuelve el ícono negro para aplicar el siguiente filtro
    filter: invert(97%) sepia(100%) saturate(0%) hue-rotate(90deg) brightness(115%) contrast(101%);
}

.pressed {
    @apply bg-menu-button-seleccionado;
    @apply border-r-8;
    @apply border-solid;
    @apply border-r-verde-itam-3;
    @apply text-verde-itam-3;

    //background-color: #ff00c8; //var(--dark-alt);
    //border-right: 5px solid #ff00c8;
    
    img {
        filter: brightness(0%) saturate(100%); // Vuelve el ícono negro para aplicar el siguiente filtro
        filter: invert(51%) sepia(56%) saturate(3544%) hue-rotate(136deg) brightness(96%) contrast(101%);
    }
}

.menu-button {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    padding: 0.5rem 1rem;

    &:hover {
        //background-color: #ff00c8;
    }

    &.router-link-exact-active {
        //background-color: #ff00c8; //var(--dark-alt);
        //border-right: 5px solid #ff00c8;
    }
}
</style>
