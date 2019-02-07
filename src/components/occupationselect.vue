<template>
  <div>
    <v-select
      class="occupation-dropdown"
      :items="availableOccupations"
      label="Occupations"
      solo
      @input="changedOccupation"
    ></v-select>
    <div v-show="loading"  class="loader-div">
      <img class="loader-img" src="../assets/emsi_loader.gif" alt="loader">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'occupationselect',
  data() {
    return {
      loading: false,
      selectedOccupation: 'None',
      availableOccupations: [
        'Computer Programmer',
        'Bed Tester',
      ],
    };
  },
  computed: {
    ...mapGetters('occupation', {
      jobSummaryData: 'getJobSummary',
    }),
  },
  watch: {
    jobSummaryData() {
      this.loading = false;
    },
  },
  methods: {
    ...mapActions('occupation', {
      updateOccupation: 'updateOccupation',
    }),
    changedOccupation(occupation) {
      this.loading = true;
      this.updateOccupation(occupation);
    },
  },
};
</script>

<style scoped>
  .occupation-dropdown {
    margin-top: 80px;
    max-width: 30%;
  }
  .loader-img {
    margin-top: 10%;
    width: 256px;
    height: 256px;
  }
  .loader-div {
    position: fixed;
    top: 8%;
    left: 0%;
    width: 100%;
    height: 92%;
    z-index: 1000;
    background-color: rgba(174, 183, 196, .5);
  }
</style>
