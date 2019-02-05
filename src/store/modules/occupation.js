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
  occupationInfo: () => state.info,
  occupationRegion: () => state.region,
  occupationSummary: () => state.summary,
  occupationTrends: () => state.trends,
  occupationIndustries: () => state.industries,
};

// Actions
const actions = {
  updateOccupation: ({ commit }, occupationTitle) => {
    /*
    Attempts to fetch occupation data from API for a given occupation, and mutate the state
    accordingly
     */

    // eslint-disable-next-line
    console.log(occupationTitle);
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
    }).catch(commit('updateInfo', { title: occupationTitle, onet: 'ERROR' })); // Fetch new data from API
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
  updateInfo: (state, newInfo) => { console.log(state); state.info = newInfo; },
  updateRegion: (state, newRegion) => { state.region = newRegion; },
  updateSummary: (state, newSummary) => { state.summary = newSummary; },
  updateTrends: (state, newTrends) => { state.trends = newTrends; },
  updateIndustries: (state, newIndustries) => { state.industries = newIndustries; },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
