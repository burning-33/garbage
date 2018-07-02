// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import Swiper from '../node_modules/swiper/dist/css/swiper.min.css'
import axios from 'axios'
import {post,fetch,patch,put,det} from './util/common'
import Clipboard from 'clipboard';
import BScroll from 'better-scroll'
import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
import 'vant/lib/vant-css/index.css';
// axios.defaults.baseURL ='http://garbage.xxw360.com/api/';
// 定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$det=det

Vue.config.productionTip = false
Vue.use(Vant);
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
