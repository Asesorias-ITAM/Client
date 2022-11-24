<template>
    <!-- <header class="header bg-verde-itam-1">
        <div class="header w-[97%]">

            <div class="header-navigation flex grow items-center justify-between">
                <nav class="header-navigation-links">
                    <img src="https://assets.codepen.io/285131/untitled-ui-icon.svg" />
                    <img src="https://assets.codepen.io/285131/untitled-ui.svg" />

                    <a> Home </a>
                    <a> Dashboard </a>
                    <a> Reporting </a>
                    <a> Users </a>
                </nav>
                
                <div class="flex items-center">
                    <a>
                        <span>Upgrade now</span>
                    </a>
                </div>
            </div>

        </div>
    </header> -->

    <!-- <header class="flex items-center align-top h-[10vh]"></header> -->
    
    <header class="header bg-verde-itam-1">
        <div class="header w-[97%]">

            <div class="header-navigation flex grow items-center justify-between">
                <div class="header-logo">
                    <img class="logo" src="@/assets/logo.svg"/>
                    <img class="logo-bg" src="@/assets/logo_bg.svg"/>

                    <div class="flex titulo">
                        <h1 class="ml-[30rem] text-6xl font-bold text-texto-light-2">
                            ASESORÍAS ITAM
                        </h1>
                    </div>
                </div>
                
                <div class="theme_button flex mb-7">
                    <ThemeButton/>
                </div>
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
////////////
.header {
	display: flex;
	align-items: center;
    //height: 10vh;
    height: 4.5rem;
    //height: 72px;
    
    //width: 90%;
	//max-width: 1280px;
	margin-left: auto;
    margin-right: auto;
    
    & > a {
		//display: none;
	}
    
}


.header-logo {
	margin-right: 2.5rem;
    display: flex;
    align-items: center;

    @media (max-width: 975px) {
		display: none;
	}
}

.titulo {
    //margin-right: 2.5rem;
    //align-items: center;

    // Esconde parte del título si ya no cabe
    @media (max-width: 975px) {
		display: none;
	}
}

.header-navigation {
	@media (max-width: 975px) {
		//display: none;
	}
}

.header-navigation-links {
	display: flex;
	align-items: center;
    font-weight: 500;

	a {
		& + * {
			margin-left: 1.5rem;
		}

	}
}

///////////

.logo {
    position: fixed;
    z-index: 2;

    //Azul: #2A5E9A
    filter: invert(33%) sepia(9%) saturate(5915%) hue-rotate(179deg) brightness(90%) contrast(84%);
    
    //Azul 2: 
    //filter: invert(37%) sepia(88%) saturate(733%) hue-rotate(180deg) brightness(92%) contrast(91%);

    //Verde: #165F28
    //filter: invert(24%) sepia(81%) saturate(451%) hue-rotate(82deg) brightness(99%) contrast(93%);

    @media (max-width: 10px) {
		display: none;
	} 
}

.logo-bg {
    position: fixed;
    z-index: 1;

    // Blanco
    filter: saturate(100%) brightness(0%);
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(215deg) brightness(109%) contrast(102%); 

    display: inline;

    @media (max-width: 10px) {
		display: none;
	}
}

.titulo {
    display: inline-block;
    flex: 1 0 auto;
    overflow: hidden;
}

.theme_button {
    display: flex;
    flex: 0.3 0 auto;
	//align-items: center;

    @media (max-width: 1200px) {
		display: none;
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