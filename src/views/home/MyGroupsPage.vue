<template>
    {{this.store.pubsIDs}}
</template>
<script>
import { useUserStore } from '@/stores/user.js'

export default{
    name: "MyGroupsPage",
    setup() {
        const store = useUserStore()
        
        return {
            store
        }
    },
    created(){
        this.store.getGrupos()
    }

}
</script>