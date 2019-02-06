<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="updateOccupation('Computer Programmer')">
        <span class="mr-2">Programmer</span>
      </v-btn>
      <v-btn @click="updateOccupation('Grunge Musician')">
        <span class="mr-2">Grunge</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <p>{{ info }}</p>
      <p>{{ summary }}</p>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('occupation', {
      info: 'occupationInfo',
      summary: 'occupationSummary',
    }),
  },
  methods: mapActions('occupation', [
    'updateOccupation',
  ]),
};
</script>
