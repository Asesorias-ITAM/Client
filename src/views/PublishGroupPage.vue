<template>
    <div>
        Esta es la página de creación de grupos
        <PublishGroupForm/>
    </div>
</template>

<script>
import PublishGroupForm from '@/components/shared/PublishGroupForm.vue';

export default {
    name: "PublishGroupPage",
    components: { PublishGroupForm },
    data() {
        return {
        }
    },
}
</script>

<style scoped>

</style>