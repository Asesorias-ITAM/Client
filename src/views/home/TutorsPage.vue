<template>
    <h1>TEST</h1>

</template>
<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user'
import { useRouter } from "vue-router";

export default{
    name:"TutorsPage.vue",
    setup(){
        const router = useRouter();
        const store = useUserStore()
        
        return {
            store,
            router,
        }
    },
}
</script>
