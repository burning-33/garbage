import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Classify from '@/components/Classify'
import Cart from '@/components/Cart'
import Me from '@/components/Me'
import login from '@/components/login/login'
import register from '@/components/login/register'
import forgetPwd from '@/components/login/forgetPwd'
import PersonalInfo from '@/components/personal/PersonalInfo'
import CheckCode from '@/components/personal/CheckCode'
import editPhone from '@/components/personal/CheckCode'
import review from '@/components/personal/review'
import setPwd from '@/components/personal/setPwd'
import newPhone from '@/components/personal/newPhone'
import nikename from '@/components/personal/nikename'
import changeImg from '@/components/personal/headImg/changeImg'
import cutImg from '@/components/personal/headImg/cutImg'
import addressList from '@/components/address/addressList'
import addAddress from '@/components/address/addAddress'
import editAddress from '@/components/address/addAddress'
import mySpend from '@/components/discounts/mySpend'
import friendSpend from '@/components/discounts/friendSpend'
import preferLevel from '@/components/discounts/preferLevel'
import orderList from '@/components/personal/order/orderList'
import orderDetail from '@/components/personal/order/orderDetail'
import logistics from '@/components/personal/order/logistics'
import toReview from '@/components/personal/order/toReview'
import writingReview from '@/components/personal/order/writingReview'
import Search from '@/components/Search'
import ordersure from '@/Soncomponents/Ordersure'
import Details from '@/Soncomponents/Details'
import Comment from '@/Soncomponents/Comment'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{act:'4'}
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
      path: '/login/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd,
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
      path: '/Me/PersonalInfo/editPhone',
      name: 'editPhone',
      component: editPhone,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/setPwd',
      name: 'setPwd',
      component: setPwd,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/newPhone',
      name: 'newPhone',
      component: newPhone,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/nikename',
      name: 'nikename',
      component: nikename,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/changeImg',
      name: 'changeImg',
      component: changeImg,
      meta:{showFooter:false}
    },
    {
      path: '/Me/PersonalInfo/cutImg',
      name: 'cutImg',
      component: cutImg,
      meta:{showFooter:false}
    },
    {
      path: '/Me/addressList',
      name: 'addressList',
      component: addressList,
      meta:{showFooter:false}
    },
    {
      path: '/Me/review',
      name: 'review',
      component: review,
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
      path: '/Me/orderList/orderDetail',
      name: 'orderDetail',
      component: orderDetail,
      meta:{showFooter:false}
    },
    {
      path: '/Me/orderList/logistics',
      name: 'logistics',
      component: logistics,
      meta:{showFooter:false}
    },
    {
      path: '/Me/orderList/toReview',
      name: 'toReview',
      component: toReview,
      meta:{showFooter:false}
    },
    {
      path: '/Me/orderList/writingReview',
      name: 'writingReview',
      component: writingReview,
      meta:{showFooter:false}
    },
    {
      path: '/Search',
      name: 'search',
      component: Search,
    },
    {
      path: '/Ordersure',
      name: 'ordersure',
      component: ordersure,
    },
    {
      path: '/Details',
      name: 'details',
      component: Details,
    },
    {
      path: '/Comment',
      name: 'comment',
      component: Comment,
    }
  ]
})
