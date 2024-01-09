import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.$axios=axios
//main.js에서 한번만 import해주면 프로젝트 전역에서 사용할 수 있다.이 두 문장은 각 컴포넌트에서마다 import해서 가져올 필요없이,this.$axios를 통해 axios 사용가능

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
