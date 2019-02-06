<template>
  <v-card v-if="jobTitle">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-2">Occupation Summary for {{jobTitle}}</h3>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs4>
        <h1 class="font-italic">{{animatedJobCount}}</h1>
        <span>Jobs ({{jobSummaryData['year']}})</span>
        <br>
        <span>{{animatedNationalAverage}}%
          <i :style="cssProps" class="job-count">{{nationalRateStatus}}</i> national average</span>
      </v-flex>
      <v-divider vertical></v-divider>
      <v-flex xs4>
        <h1 :style="cssProps" class="font-italic regional-growth-rate">
          {{getRegionalOperator()}}{{animatedRegionalRate}}%
        </h1>
        <span>% Change ({{jobGrowthData['start_year']}}-{{jobGrowthData['end_year']}})</span>
        <br>
        <span> Nation:
          <i :style="cssProps" class="national-growth-rate">
             {{getNationalOperator()}}{{animatedNationalRate}}%
          </i>
        </span>
      </v-flex>
      <v-divider vertical></v-divider>
      <v-flex xs4>
        <h1 class="font-italic">${{animatedRegionalEarnings}}/hr</h1>
        <span>Median Hourly Earnings</span>
        <br>
        <span>Nation: ${{animatedNationalEarnings}}/hr</span>
      </v-flex>
    </v-layout>
  </v-card>
</template>


<script>
import { mapGetters } from 'vuex';
import { TweenLite } from 'gsap';

export default {
  name: 'datasummary',
  computed: {
    ...mapGetters('occupation', {
      jobTitle: 'getTitle',
      jobSummaryData: 'getJobSummary',
      jobGrowthData: 'getGrowthSummary',
      jobEarningData: 'getEarningSummary',
    }),
    cssProps() {
      return {
        '--nationalRateColor': this.nationalRateColor,
        '--regionalGrowthColor': this.getRegionalGrowthColor(),
        '--nationalGrowthColor': this.getNationalGrowthColor(),
      };
    },
    animatedJobCount() {
      return this.tweenedRegionalJobCount.toFixed(0);
    },
    animatedRegionalRate() {
      return this.tweenedRegionalRate.toFixed(1);
    },
    animatedNationalRate() {
      return this.tweenedNationalRate.toFixed(1);
    },
    animatedRegionalEarnings() {
      return this.tweenedRegionalEarnings.toFixed(1);
    },
    animatedNationalEarnings() {
      return this.tweenedNationalEarnings.toFixed(1);
    },
    animatedNationalAverage() {
      return this.tweenedNationalAverage.toFixed(0);
    },
  },
  watch: {
    regionalJobCount(newValue) {
      TweenLite.to(this.$data, 2, { tweenedRegionalJobCount: newValue });
    },
    regionalRate(newValue) {
      TweenLite.to(this.$data, 2, { tweenedRegionalRate: newValue });
    },
    nationalRate(newValue) {
      TweenLite.to(this.$data, 2, { tweenedNationalRate: newValue });
    },
    nationalEarnings(newValue) {
      TweenLite.to(this.$data, 2, { tweenedNationalEarnings: newValue });
    },
    regionalEarnings(newValue) {
      TweenLite.to(this.$data, 2, { tweenedRegionalEarnings: newValue });
    },
    nationalAverage(newValue) {
      TweenLite.to(this.$data, 2, { tweenedNationalAverage: newValue });
    },
    jobSummaryData() {
      this.regionalJobCount = this.jobSummaryData.regional;
      this.nationalAverage = this.calculatedJobAboveNatl();
    },
    jobGrowthData() {
      this.regionalRate = this.jobGrowthData.regional;
      this.nationalRate = this.jobGrowthData.national_avg;
    },
    jobEarningData() {
      this.regionalEarnings = this.jobEarningData.regional;
      this.nationalEarnings = this.jobEarningData.national_avg;
    },
  },
  data() {
    return {
      regionalJobCount: 0,
      tweenedRegionalJobCount: 0,
      regionalRate: 0.0,
      tweenedRegionalRate: 0.0,
      nationalRate: 0.0,
      tweenedNationalRate: 0.0,
      regionalEarnings: 0.0,
      tweenedRegionalEarnings: 0.0,
      nationalEarnings: 0.0,
      tweenedNationalEarnings: 0.0,
      nationalAverage: 0,
      tweenedNationalAverage: 0,
      nationalRateColor: '#00b25f',
      nationalRateStatus: 'above',
    };
  },
  methods: {
    calculatedJobAboveNatl() {
      const regionalJobs = parseFloat(this.jobSummaryData.regional);
      const nationalJobs = parseFloat(this.jobSummaryData.national_avg);
      if (regionalJobs > nationalJobs) {
        this.nationalRateStatus = 'above';
        this.nationalRateColor = '#00b25f';
        const rate = (regionalJobs / nationalJobs) * 100;
        return parseInt(rate, 10);
      }
      this.nationalRateStatus = 'below';
      this.nationalRateColor = '#d91e1e';
      const rate = (nationalJobs / regionalJobs) * 100;
      return parseInt(rate, 10);
    },
    getRegionalOperator() {
      return (this.jobGrowthData.regional > 0 ? '+' : '');
    },
    getRegionalGrowthColor() {
      return (this.jobGrowthData.regional > 0 ? '#00b25f' : '#d91e1e');
    },
    getNationalOperator() {
      return (this.jobGrowthData.national_avg > 0 ? '+' : '');
    },
    getNationalGrowthColor() {
      return (this.jobGrowthData.national_avg > 0 ? '#00b25f' : '#d91e1e');
    },
  },
};
</script>

<style scoped>
  .v-divider--vertical {
    border-top-width: 2px;
    border-right-width: thin;
    border-bottom-width: 100px;
    border-left-width: 1px;
  }
  .job-count {
    color: var(--nationalRateColor);
  }
  .regional-growth-rate {
    color: var(--regionalGrowthColor);
  }
  .national-growth-rate {
    color: var(--nationalGrowthColor);
  }
</style>
