<template>
  <v-card v-if="industryData" height="100%">
    <v-card-title primary-title>
      <h3 class="headline mb-2">Industries Employing {{jobTitle}} </h3>
    </v-card-title>
    <v-card-media>
      <apexchart id type="bar" :options="chartOptions" :series="series"></apexchart>
    </v-card-media>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'industries',
  watch: {
    industryData: function (newData) {
      const industryList = [];
      for (let i = 0; i < newData.length; i++) {
        industryList.push(`${newData[i].title} (${newData[i].in_occupation_jobs} jobs)`);
      }

      this.chartOptions = { ...this.chartOptions,
        ...{
          xaxis: {
            categories: industryList,
          },
        },
      };
      this.series[0].name = `% of Occupation in Industry (${this.year})`;
      this.series[1].name = `% of Total Jobs in Industry (${this.year})`;

      this.generatePercentOccupationInIndustry();
      this.generatePercentTotalInIndustry();


    },
  },
  methods: {
    generatePercentOccupationInIndustry() {
      const list = [];
      for (let i = 0; i < this.industryData.length; i++) {
        const newValue = (this.industryData[i].in_occupation_jobs / this.jobSummaryData.regional) * 100;
        list.push(newValue.toFixed(1));
      }
      this.series[0].data = list;
    },
    generatePercentTotalInIndustry() {
      const list = [];
      for (let i = 0; i < this.industryData.length; i++) {
        const newValue = (this.industryData[i].in_occupation_jobs / this.industryData[i].jobs) * 100;
        list.push(newValue.toFixed(1));
      }
      this.series[1].data = list;
    },
  },
  computed: {
    ...mapGetters('occupation', {
      year: 'getYear',
      jobs: 'getJobCount',
      industryData: 'getIndustries',
      jobTitle: 'getTitle',
      jobSummaryData: 'getJobSummary',
    }),
  },
  data() {
    return {
      chart: {
        id: 'Occupation-Industries',
      },
      series: [{
        name: '',
        data: [],
      }, {
        name: '',
        data: [],
      },
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff'],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 100,
          labels: {
            formatter(value) {
              return value + '%';
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
