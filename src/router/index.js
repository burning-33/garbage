import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Classify from '@/components/Classify'
import Cart from '@/components/Cart'
import Me from '@/components/Me'
import login from '@/components/login/login'
import register from '@/components/login/register'
import PersonalInfo from '@/components/personal/PersonalInfo'
import CheckCode from '@/components/personal/CheckCode'
import setPwd from '@/components/personal/setPwd'
import addressList from '@/components/address/addressList'
import addAddress from '@/components/address/addAddress'
import editAddress from '@/components/address/addAddress'
import mySpend from '@/components/discounts/mySpend'
import friendSpend from '@/components/discounts/friendSpend'
import preferLevel from '@/components/discounts/preferLevel'
import orderList from '@/components/personal/order/orderList'
import logistics from '@/components/personal/order/logistics'
import Search from '@/components/Search'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Classify',
      name: 'classify',
      component: Classify,
    },
    {
      path: '/Cart',
      name: 'cart',
      component: Cart,

    },
    {
      path: '/Me',
      name: 'me',
      component: Me
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{showFooter:false}
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo',
      name: 'PersonalInfo',
      component: PersonalInfo,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/CheckCode',
      name: 'CheckCode',
      component: CheckCode,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/setPwd',
      name: 'setPwd',
      component: setPwd,
      meta:{showFooter:false}
    },
    {
      path: '/Me/addressList',
      name: 'addressList',
      component: addressList,
      meta:{showFooter:false}
    },
    {
      path: '/Me/address/addAddress',
      name: 'addAddress',
      component: addAddress,
      meta:{showFooter:false}
    },
    {
      path: '/Me/address/editAddress',
      name: 'editAddress',
      component: editAddress,
      meta:{showFooter:false}
    },
    {
      path: '/Me/mySpend',
      name: 'mySpend',
      component: mySpend,
      meta:{showFooter:false}
    },
    {
      path: '/Me/friendSpend',
      name: 'friendSpend',
      component: friendSpend,
      meta:{showFooter:false}
    },
    {
      path: '/Me/preferLevel',
      name: 'preferLevel',
      component: preferLevel,
      meta:{showFooter:false}
    },
    {
      path: '/Me/orderList',
      name: 'orderList',
      component: orderList,
      meta:{showFooter:false}
    },
    {
      path: '/Me/logistics',
      name: 'logistics',
      component: logistics,
      meta:{showFooter:false}
    },
    {
      path: '/Search',
      name: 'search',
      component: Search,
    }
  ]
})
