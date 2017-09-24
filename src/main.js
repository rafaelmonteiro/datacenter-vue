import '@/main.less'

import Vue from 'vue'
import App from './App'
import router from './router'
import data from './config'
import VueResource from 'vue-resource'
import toastr from 'vue-toastr';
import autoProgress from 'vue-auto-progress'
import modal from '@/components/common/Modal'
import fieldValidation from 'vue-bootstrap-validate'
import VueMask from 'v-mask'
import money from 'v-money'
import vueUpload from '@websanova/vue-upload'
import vueMoment from 'vue-moment'

window.jQuery = require('jquery'); // << import jquery global
require('bootstrap'); // << import js bootstrap

Vue.use(vueMoment)
Vue.use(vueUpload);
Vue.use(VueResource)
Vue.use(VueMask)
Vue.use(money, {
	decimal: ',',
  	thousands: '.',
  	precision: 2
})

Vue.http.options.root = data.apiUrl;
Vue.config.productionTip = false

Vue.component('field-validation', fieldValidation);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data,
  template: '<div><App/><modal ref="modal"/><toastr ref="toastr"/><auto-progress/></div>',
  components: { App, modal, toastr, autoProgress}
})
