<template>
  <v-app>
    <overview></overview>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <occupationselect></occupationselect>
        </v-flex>
        <v-flex xs12>
          <datasummary></datasummary>
        </v-flex>
        <v-flex xs12 xl6 height="100%">
          <trends></trends>
        </v-flex>
        <v-flex xs12 xl6 height="100%">
          <industries></industries>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import datasummary from '@/components/datasummary';
import trends from '@/components/trends';
import overview from '@/components/overview';
import industries from '@/components/industries';
import occupationselect from '@/components/occupationselect';

export default {
  name: 'App',
  components: {
    overview,
    trends,
    datasummary,
    industries,
    occupationselect,
  },
  data() {
    return {
      //
    };
  },
};
</script>
