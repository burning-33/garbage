<template>
  <div class="home">
    <div class="homeHeader">
      <router-link :to="{name: 'search'}" tag="div" class="sousuo">
          <van-icon name="search" />
      </router-link>
      <div class="signBox" @click="login" v-if="denglu">
        <div class="iconfont">&#xe611;</div>
        <div class="sign">登录</div>
      </div>
      <div class="signBox" v-else>
        <div class="sign">用户名</div>
      </div>
    </div>
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in images" :key="index" @click="goDetails(item.g_id)" >
            <img :src="item.img" class="bannerimg">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

      </div>
    </div>
    <div class="h1">推荐商品 <span class="iconfont">&#xe717;</span></div>
    <ul class="ul">
      <!--<lazy-component>-->
        <li class="li" v-for="(item,index) in list"   @click="goDetails(item.id)" :key="index">
          <img :src="item.imglist" alt="" class="goodsImg">
        </li>
      <!--</lazy-component>-->

    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Swiper from 'swiper'
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
     
    },
    data() {
      return {
        images: [],
        list: [],
        disabled: false,
        detshow:false,//是否显示详情页
        detailsid:'',
        denglu:true
      }
    },
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    mounted: function () {
      const selt = this;
      console.log(selt.GLOBAL.discount)
      if(selt.GLOBAL.discount){
        this.denglu = false
      }else{
        this.denglu = true
      }
      selt.$fetch(selt.GLOBAL.base_url + 'index')
        .then((response) => {
          console.log(response.data.goods)
          selt.images= response.data.banner
          selt.list = response.data.goods
        })
      this.swiper();
    },
    computed: {

    },
    created(){
       console.log(this.GLOBAL.token)
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
         this.$router.push({path: '/details',query:{id:id}})
      },
      // 商品详情页返回
      detafalse() {
        this.detshow = false;
      },
      login(){
        this.$router.push({ name: 'login', params: { title: '登录' }})
      },
  swiper() {
    var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      centeredSlides: true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,//修改swiper的父元素时，自动初始化swiper
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        // clickable: true,
        // clickableClass : 'my-pagination-clickable',
      },

      // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      // autoplay: {
      //   delay: 2000,
      //   stopOnLastSlide: false,
      //   disableOnInteraction: false,
      // },
    });
  },
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

