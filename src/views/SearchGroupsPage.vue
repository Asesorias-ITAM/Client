<template>
    <div> Esta es la página de búsqueda </div>
    <section class="card-grid my-3">
        <div class="grid grid-cols-4 gap-6">
            <PublicationCard v-for="pub of pub_list" :key="pub.id" v-bind="pub" class="min-h-24 overflow-auto"/>
        </div>
    </section>
</template>

<script>
import PublicationCard from "@/components/PublicationCard.vue"
let placeholder_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget lacus lectus. Nullam sed augue eget elit viverra dignissim. Ut nec urna in."

export default {
    name: "SearchGroupsPage",
    componentes: { PublicationCard },
    data() {
        return {
            pub_list: [{id: 0, materia: "Economía I", asesor: "Juan Acosta", desc: placeholder_desc},
                       {id: 1, materia: "Ideas III", asesor: "Rosa Sarmiento", desc: placeholder_desc},
                       {id: 2, materia: "SCE", asesor: "POJO", desc: placeholder_desc},
                       {id: 3, materia: "OPC", asesor: "Don Ramón", desc: placeholder_desc},
                       {id: 4, materia: "Redes I", asesor: "1ms", desc: placeholder_desc},
                      ],
        }
    },
}
</script>

<style scoped>
.card-grid {
	padding: 1rem 2rem;
	font-size: 0.875rem;
    overflow: hidden;
}
</style>