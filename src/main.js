// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 

Vue.use(BootstrapVue)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
  
})

// Vue.http.interceptors.push(function (request, next) {

//   //some api's dont like the X-CSFR-token or Pusher token.. remove it..
//   const removeAuthHeaders = request.url.includes("openiban.com");

//   request.headers['Access-Control-Allow-Origin'] = '*';

//   if (removeAuthHeaders){
//       request.headers.delete('Access-Control-Request-Headers')
//       request.headers.delete('X-Socket-ID');

//   }
//   else {
//       request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);
//   }
//   next();
// });

