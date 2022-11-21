<template>
    {{GroupID}}
    {{store.currentGrupo}}
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

import { useUserStore } from '@/stores/user.js'
import { useRouter, useRoute } from "vue-router"

export default {

    name: "GroupPage",
    setup() {
        const router = useRouter()
        const route = useRoute()
        const store = useUserStore()
         
        return {
            router,
            route,
            store
        }
    },
    computed: {
        GroupID(){
            return this.route.params.id
        },
        group(){
            return this.store.currentGrupo
        }

    }
}
</script>