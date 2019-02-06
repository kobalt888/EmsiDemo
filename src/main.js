import '@babel/polyfill';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vuex from 'vuex';
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import './plugins/axios';
import './plugins/vuetify';
import App from './App';
import store from './store';


Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  iconfont: 'md',
  store,
  components: { App },
  template: '<App/>',
});
