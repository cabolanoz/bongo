require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

import router from './Router/index';
import store from './Store/index';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App }
});
