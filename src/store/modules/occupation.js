import { getJobData } from '../../api/occupation';

// Initial State of the Occupation Data

const state = {
  info: Object,
  region: Object,
  summary: Object,
  trends: Object,
  industries: Object,
};

// Getters
const getters = {
  /*
  Functions for accessing state
   */

  // Occupation
  getTitle: () => state.info.title,

  // Region
  getRegion: () => state.region.title,

  // Summary
  getJobSummary: () => state.summary.jobs,
  getGrowthSummary: () => state.summary.jobs_growth,
  getEarningSummary: () => state.summary.earnings,

  // Trends
  getTrendTimeSpan: () => [state.trends.start_year, state.trends.end_year],
  getRegionalTrend: () => state.trends.regional,
  getStateTrend: () => state.trends.state,
  getNationalTrend: () => state.trends.nation,

  // Industries
  getYear: () => state.industries.year,
  getJobCount: () => state.industries.jobs,
  getIndustries: () => state.industries.industries,
};

// Actions
const actions = {
  updateOccupation: ({ commit }, occupationTitle) => {
    /*
    Attempts to fetch occupation data from API for a given occupation, and mutate the state
    accordingly
     */
    getJobData(occupationTitle).then((payload) => {
      // eslint-disable-next-line
      if (payload !== undefined) {
        //  Got a proper response from the endpoint; lets mutate state
        commit('updateInfo', payload.occupation);
        commit('updateRegion', payload.region);
        commit('updateSummary', payload.summary);
        commit('updateTrends', payload.trend_comparison);
        commit('updateIndustries', payload.employing_industries);
      }
    }); // Fetch new data from API
  },
};

// Mutations
const mutations = {
  /* eslint-disable */
  // ^^ False no-shadow  ^^
  updateInfo: (state, newInfo) => { state.info = newInfo },
  updateRegion: (state, newRegion) => { state.region = newRegion; },
  updateSummary: (state, newSummary) => { state.summary = newSummary; },
  updateTrends: (state, newTrends) => { state.trends = newTrends; },
  updateIndustries: (state, newIndustries) => { state.industries = newIndustries; },
  /* eslint-enable */
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
