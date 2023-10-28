<template>
    <div style="height: 100%">
        <v-row style="height: 90%">
            <!-- <span>Abaco</span> -->

            <abaco></abaco>

        </v-row>
    </div>
</template>

<script>
// import { mapState } from 'vuex';
import abaco from './AbacoCanvas.vue'

export default {
  name: 'Abaco',

  components: {
    abaco
  },
  data: () => ({

  }),
  
  watch: {
  },
  mounted() {
  },
  methods: {

  },

};
</script>

<style>
@media (max-width: 600px) {
  body {
    background-color: blue;
  }
}
</style>