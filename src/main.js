import Vue from 'vue'
import App from './App.vue'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import router from './router/router.js'
Vue.config.productionTip = false
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  let token = localStorage.getItem('project_vue_itcast')
  if (to.path === '/login' || token) {
    next()
  } else {
    next({ name: 'login' })
  }
})
Vue.use(elementUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
