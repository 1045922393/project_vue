import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import home from '../views/home.vue'
import users from '../views/users/users.vue'
import so from '../components/second-one.vue'
import welcome from '../views/welcome.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'default',
      path: '/',
      redirect: '/login'
    },
    {
      name: 'home',
      path: '/home',
      component: home,
      children: [
        {
          name: 'welcome',
          path: '/home/',
          component: welcome
        },
        {
          name: 'users',
          path: 'users',
          component: users
        },
        {
          name: 'second-one',
          path: '2-2',
          component: so
        }
      ]
    }
  ]
})
