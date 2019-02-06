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
  getEarningSummary: () => state.summary.jobs.earnings,

  // Trends
  getTrendTimeSpan: () => [state.trends.start_year, state.trends.end_year],
  getRegionalTrend: () => state.trends.regional,
  getStateTrend: () => state.trends.state,
  getNationalTrend: () => state.trends.nation,

  // Industries
  getYear: () => state.industries.year,
  getJobCount: () => state.industries.jobs,
  getIndustries: () => state.industries.industries
};

// Actions
const actions = {
  updateOccupation: ({ commit }, occupationTitle) => {
    /*
    Attempts to fetch occupation data from API for a given occupation, and mutate the state
    accordingly
     */
    actions.clearOccupation({ commit }); // Remove existing data from state for occupation
    getJobData(occupationTitle).then((payload) => {
      // eslint-disable-next-line
      console.log(payload);
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
  clearOccupation: ({ commit }) => {
    /*
    Removes current information from state tree
    */
    commit('updateInfo', null);
    commit('updateRegion', null);
    commit('updateSummary', null);
    commit('updateTrends', null);
    commit('updateIndustries', null);
  },
};

// Mutations
const mutations = {
  /* eslint-disable */
  // ^^ False no-shadow  ^^
  updateInfo: (state, newInfo) => { state.info = newInfo; },
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
