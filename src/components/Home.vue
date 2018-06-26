<template>
  <div class="home">
    <div class="homeHeader">
      <router-link :to="{name: 'search'}" tag="div" class="sousuo">
          <van-icon name="search" />
      </router-link>
      <div class="signBox" @click="login">
        <div class="iconfont">&#xe611;</div>
        <div class="sign">登录</div>
      </div>
    </div>
    <div class="banner">
      <van-swipe >
        <van-swipe-item v-for="(item, index) in images" :key="index" >
          <img :src="item.img" alt="" @click="goDetails(item.g_id)" class="bannerimg">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="h1">推荐商品 <span class="iconfont">&#xe717;</span></div>
    <ul class="ul"
      v-waterfall-lower="loadMore"
      waterfall-disabled="disabled"
      waterfall-offset="400"
    >
      <li class="li" v-for="(item,index) in list" @click="goDetails(item.id)" :key="index">
        <img :src="item.imglist" alt="" class="goodsImg">
      </li>
    </ul>
    <transition name="slide-fade">
        <Details
          v-if="detshow"
          @detafalse = 'detafalse'
          :detailsid = 'detailsid'
        />
    </transition>
  </div>
</template>

<script>
  import Details from '../SonComponents/details.vue'
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'vant';
  import { Lazyload } from 'vant';
  import { Waterfall } from 'vant';
  import { Icon } from 'vant';
  Vue.use(Lazyload);
  Vue.use(Swipe).use(SwipeItem);
  Vue.use(Waterfall);
  Vue.use(Icon);
  export default {
    name: 'Home',
    components:{
      Details,
    },
    data() {
      return {
        images: [],
        list: [],
        disabled: false,
        detshow:false,//是否显示详情页
        detailsid:''
      }
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    mounted: function () {
      const selt = this;
      selt.$fetch(selt.GLOBAL.base_url + 'index')
        .then((response) => {
          console.log(response)
          selt.images= response.data.banner
          selt.list = response.data.goods
        })
    },
    computed: {

    },
    methods: {
      loadMore() {
        this.disabled = true;
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            // this.list.push(this.list.length);
          }
          this.disabled = false;
        }, 200);
      },
      goDetails(id){
        this.detshow = true;
        this.detailsid = id
      },
      // 商品详情页返回
      detafalse() {
        this.detshow = false;
      },
      login(){
        this.$router.push({ name: 'login', params: { title: '登录' }})
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .slide-fade-enter-active {
    transition: all .6s ease;
    transform: translateX(0);
  }
  .slide-fade-leave-active {
    transition: all .6s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }
  .home{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: #eceeeb;
    .h1{
      text-align: center;
      color: #ff4511;
      background: #ffffff;
      line-height: 40px;
      font-size: 20px;
      .iconfont{
        color: #ff4511;
        font-size: 20px;
      }
    }
  }
  .homeHeader{
    text-align: center;
    background: #ffffff;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    height: 60px;
  }
.sousuo{
  width: 60%;
  height: 1.6rem;
  border:1px solid #bfbfbf;
  border-radius: 4px;
  margin: 0;
  display: inline-block;
  text-align: left;
  padding: 4px 0 0 10px;
  box-sizing: border-box;
}
.signBox{
  width: 20%;
  display: inline-block;
  text-align: center;
  font-size: 0;
  .iconfont{
    width: 20px;
    height: 16px;
    color: #73ab1d;
    margin:0 auto;
    font-size: 16px;
    margin-bottom: 4px;
  }
}
  .sign{
    width: 100%;
    margin: 0;
    font-size: 14px;
  }
  .banner{
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    img{
      width: 100%;
      height: 200px;
    }
    .van-swipe__indicator--active{
      background-color: #2bbf3a;
    }
  }
  .ul{
    width: 100%;
    margin: 0 auto;
    background: white;
    padding: 10px 0;
  }
  .li{
    width: 90%;
    height: 300px;
    margin: 0 auto;
    border: 1px solid #ececec;
    margin-bottom: 10px;
    background: white;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>

