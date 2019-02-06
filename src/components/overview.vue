<template>
  <v-toolbar app>
    <v-toolbar-title>
      <h4><b>Occupation Overview</b></h4>
      <span v-if="jobTitle" class="font-weight-thin"><i>{{jobTitle}} in {{jobRegion}}</i></span>
      <span v-else class="font-weight-thin"><i>Select an occupation</i></span>
      <v-spacer></v-spacer>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'overview',
  computed: {
    ...mapGetters('occupation', {
      jobTitle: 'getTitle',
      jobRegion: 'getRegion',
    }),
  },
};

</script>

<style scoped>

</style>
