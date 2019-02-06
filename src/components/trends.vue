<template>
  <v-card v-if="regionalTrend">
    <v-card-title primary-title>
      <h3 class="headline mb-2">Regional Trends</h3>
    </v-card-title>
    <v-card-media>
      <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
    </v-card-media>
    <v-layout align-left justify-left row fill-height>
      <v-flex xs8>
        <div class="text-xs-left">
          <h5 style="margin-left: 10px">Region</h5>
        </div>
      </v-flex>
      <v-flex xs1>
        <h5>{{timespan[0]}} jobs</h5>
      </v-flex>
      <v-flex xs1>
        <h5>{{timespan[1]}} jobs</h5>
      </v-flex>
      <v-flex xs1>
        <h5>Change</h5>
      </v-flex>
      <v-flex xs1>
        <h5 style="margin-right: 4px">% Change</h5>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout align-left justify-left row fill-height>
      <v-flex xs8>
        <div class="text-xs-left">
          <span style="margin-left: 10px">Region</span>
        </div>
      </v-flex>
      <v-flex xs1>
        <span>{{regionalTrend[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{regionalTrend.slice(-1)[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{regionalTrend.slice(-1)[0] - regionalTrend[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{((((regionalTrend).slice(-1)[0] / regionalTrend[0]) - 1.0)*100).toFixed(1)}}%</span>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout align-left justify-left row fill-height>
      <v-flex xs8>
        <div class="text-xs-left">
          <span style="margin-left: 10px">State</span>
        </div>
      </v-flex>
      <v-flex xs1>
        <span>{{stateTrend[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{stateTrend.slice(-1)[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{stateTrend.slice(-1)[0] - stateTrend[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{((((stateTrend).slice(-1)[0] / stateTrend[0]) - 1.0)*100).toFixed(1)}}%</span>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout align-left justify-left row fill-height>
      <v-flex xs8>
        <div class="text-xs-left">
          <span style="margin-left: 10px">National</span>
        </div>
      </v-flex>
      <v-flex xs1>
        <span>{{nationalTrend[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{nationalTrend.slice(-1)[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{nationalTrend.slice(-1)[0] - nationalTrend[0]}}</span>
      </v-flex>
      <v-flex xs1>
        <span>{{((((nationalTrend).slice(-1)[0] / nationalTrend[0]) - 1.0)*100).toFixed(1)}}%</span>
      </v-flex>
    </v-layout>
    <br>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'trends',
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'Occupation-Trendline',
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Year',
          },
        },
        yaxis: {
          title: {
            text: 'Percent Change in Jobs Year-to-Year',
          },
          min: -20,
          max: 20,
          labels: {
            formatter(value) {
              return parseFloat(value).toFixed(2) + '%';
            },
          },
        },
      },
      series: [{
        name: 'Region',
        data: [],
      },
      {
        name: 'State',
        data: [],
      },
      {
        name: 'National',
        data: [],
      }],
    };
  },
  watch: {
    timespan() {
      this.chartOptions.xaxis.categories = this.generateYears();
      this.series[0].data = this.generatePercentList(this.regionalTrend);
      this.series[1].data = this.generatePercentList(this.stateTrend);
      this.series[2].data = this.generatePercentList(this.nationalTrend);
    },
  },
  methods: {
    generateYears() {
      const start = this.timespan[0];
      const end = this.timespan[1];
      const list = [];
      for (let i = start; i <= end; i++) {
        list.push(i);
      }
      return list;
    },
    generatePercentList(trend) {
      const list = [];
      for (let i = 0; i < trend.length; i++) {
        if (i === trend.length - 1) {
          list.push(((trend[i] / trend[i - 1]) - 1) * 100.0);
        } else {
          list.push((1 - (trend[i] / trend[i + 1])) * 100.0);
        }
      }
      return list;
    },
  },
  computed: {
    ...mapGetters('occupation', {
      timespan: 'getTrendTimeSpan',
      regionalTrend: 'getRegionalTrend',
      stateTrend: 'getStateTrend',
      nationalTrend: 'getNationalTrend',
    }),
  },
};
</script>

<style scoped>
  .v-divider {
    border-top-width: 1px;
    border-right-width: thin;
    border-bottom-width: 1px;
    border-left-width: 1px;
  }
</style>
