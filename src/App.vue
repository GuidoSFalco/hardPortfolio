<template>
  <v-app>
      <div id="app">
        <template>
          <v-card class="mx-auto overflow-hidden" height="100%">

            <v-app-bar color="deep-purple accent-4" dark prominent>
              <v-app-bar-nav-icon @click.stop="lateralMenu = !lateralMenu"></v-app-bar-nav-icon>
              <v-btn icon v-if="$store.state.page.urlActualPage != ''" @click="goBackPage">
                <v-icon>mdi-arrow-u-left-top</v-icon>
              </v-btn>

              <v-toolbar-title>{{ $store.state.page.nameActualPage }}</v-toolbar-title>
              <span class="mt-2 mx-auto">MAS INFO? TE DEJO MIS REDES PARA CONTACTARME

                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
                <v-icon color="blue" class="mb-1">mdi-play</v-icon>
              </span>
              <!-- <v-spacer></v-spacer> -->

              <!-- <v-btn icon href="https://www.linkedin.com/in/guido-falco-463a9a1bb/" target="_blank">
                <v-icon>mdi-linkedin</v-icon>
              </v-btn> -->

              <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                icon 
                href="https://www.linkedin.com/in/guido-falco-463a9a1bb/" 
                target="_blank"
                v-bind="attrs"
                v-on="on"
                >
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
              </template>
              <span>LinkedIn</span>
            </v-tooltip>

              <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                icon 
                href="https://www.getmanfred.com/perfil/5f7ef041-c39b-4b52-946a-51014619446f" 
                target="_blank"
                v-bind="attrs"
                v-on="on"
                >
                  <v-icon>mdi-briefcase</v-icon>
                </v-btn>
              </template>
              <span>MI CV</span>
            </v-tooltip>

            </v-app-bar>

            <v-navigation-drawer v-model="lateralMenu" absolute bottom temporary>
              <v-list nav dense>
                <v-list-item-group v-model="group" v-for="item, index in menuItems" :key="index">
                  <v-list-item
                    :style="`background: ${(item.selected) ? '#311B92' : ''}; color: ${(item.selected) ? 'white' : 'black'}`"
                    @click="changeMenu(index)">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>

            <v-card-text style="overflow-y: auto;height: max-content">

              <PaginaPrincipal v-if="$store.state.page.urlActualPage == '' || $store.state.page.urlActualPage == null"></PaginaPrincipal>
              <CodigoMorse v-if="$store.state.page.urlActualPage == 'codigomorse'"></CodigoMorse>
              <Abaco v-if="$store.state.page.urlActualPage == 'abaco'"></Abaco>
            </v-card-text>
          </v-card>
        </template>

      </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import { mapState } from 'vuex';
import PaginaPrincipal from './views/PaginaPrincipal.vue'
import CodigoMorse from './views/CodigoMorse.vue'
import Abaco from './views/Abaco/Abaco.vue'


export default {
  name: 'App',

  components: {
    PaginaPrincipal,
    CodigoMorse,
    Abaco
  },
  data: () => ({
    lateralMenu: false,
    group: null,
    ancho: null,

    menuItems: [
      { title: 'Inicio', url: '', selected: true },
      { title: 'Codigo Morse', url: 'codigomorse', icon: 'mdi-head-dots-horizontal', selected: false },
      { title: 'Abaco', url: 'abaco', selected: false },
      { title: 'News', selected: false },
    ],
  }),
  watch: {
    group() {
      this.lateralMenu = false
    },
  },
  computed: {
  },

  methods: {
    changeMenu(index) {
      if (this.menuItems[index].selected == false) {
        
      
        this.menuItems = this.menuItems.map((item) => {
          item.selected = false
          return item
        })

        this.menuItems[index].selected = true

        this.$store.state.page.urlActualPage = this.menuItems[index].url
        this.$store.state.page.nameActualPage = this.menuItems[index].title
        // this.$router.push(`/${this.menuItems[index].url}`)
      }
    },

    goBackPage() {
      this.menuItems = this.menuItems.map((item) => {
        item.selected = false
        return item
      })
      this.menuItems[0].selected = true

      this.$store.state.page.urlActualPage = ''
      this.$store.state.page.nameActualPage = this.menuItems[0].title
    },

    
  },

  beforeRouteLeave(to, from, next) {
    // Save default router.push value
    this.$options.router.defaultPush = this.$router.push;
    next();
  },
  beforeRouteEnter(to, from, next) {
    // Assign default router.push value
    this.$router.push = this.$options.router.defaultPush;
    console.log('recargo')
    next();
  },
};
</script>
