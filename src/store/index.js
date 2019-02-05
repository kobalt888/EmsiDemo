import Vue from 'vue';
import Vuex from 'vuex';
import occupation from '@/store/modules/occupation';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    occupation,
  },
});
