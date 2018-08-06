import Vue from 'vue';
import App from './components/SubApp.vue';

window.onload = () => {
  new Vue(App).$mount('#app');
};

