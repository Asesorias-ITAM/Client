<template>
    <div>
        <PublishGroupForm/>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import paths from "@/file_paths.js"

export default {
    name: "PublishGroupPage",
    components: { 
        PublishGroupForm: defineAsyncComponent(() => import("@/" + paths["PublishGroupForm"]))
    },
    data() {
        return {
        }
    },
}
</script>

<style scoped>

</style>