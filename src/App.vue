<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="updateOccupation('Computer Programmer')">
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <p>{{ occupationData }}</p>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      //
    };
  },
  mounted() {
    this.$store.dispatch('occupation/updateOccupation', 'None');
  },
  computed: mapState({
    occupationData: state => state.occupation.info,
  }),
  methods: mapActions('occupation', [
    'updateOccupation',
  ]),
};
</script>
