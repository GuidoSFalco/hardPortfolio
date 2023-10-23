<template>
    <v-card-text height="100%">
        <v-row>
            <v-col cols="12">

                pagina principal
            </v-col>
        </v-row>
    </v-card-text>
</template>
  
<script>

export default {
    name: 'PaginaPrincipal',

    data() {
        return {

            lateralMenu: false,
            group: null,

            menuItems: [
                { title: 'Inicio', url: '', selected: false },
                { title: 'Codigo Morse', url: 'codigomorse', selected: false },
                { title: 'Diccionario', selected: false },
                { title: 'News', selected: false },
            ],

            seleccionado: this.$store.state.page.title
        }
    },
    watch: {
        group() {
            this.lateralMenu = false
        },
    },

    methods: {
        changeMenu(index) {
            this.menuItems = this.menuItems.map((item) => {
                item.selected = false
                return item
            })

            this.menuItems[index].selected = true
            console.log(this.menuItems)
        },

    }
}
</script>
  
<style>
#app {
    height: 100vh;
}
</style>