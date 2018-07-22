/**
 * Entry point of SPA
 */
import Vue from 'vue';
import App from './components/App.vue';

window.onload = () => {
  new Vue(App).$mount('#app');
};
