import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import Login from '../views/Login/Login.vue'
//import Register from '../views/Register/Register.vue'

//const Home = ()=> import ('../views/Home.vue');
const Login = ()=> import ('../views/Login/Login.vue');
const Register = ()=> import ('../views/Register/Register.vue');
const Activity = ()=> import ('../views/Activity/Activity.vue');
const Address = ()=> import ('../views/Address/Address.vue');




Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/activity/:activityID',
    component: Activity
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
