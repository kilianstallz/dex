import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/css/main.css'
// Custom directives
const fb = require('./firebaseConfig')

Vue.config.productionTip = false

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch('user/updateUser', user)
  }
  if (!user) router.push('/auth')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
