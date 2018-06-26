<template>
  <div class="me">
    
    <!-- 头部 -->
    <div class="b-v-center mtb10 bgw ptb15 borderTB">
      <div class="imgHeader mlr20">
        <img src="../assets/logo.png" alt="">
      </div>
      <router-link :to="{name:'PersonalInfo',params:{title:'个人信息'}}" tag="div" class="b-v-center flex">
        <div class="flex">
          <div>昵称： <span>可爱的小兔子</span></div>
          <div>会员ID: <span>1000101</span></div>
        </div>
        <div class="mlr10 iconfont"><span>&#xe60d;</span></div>
      </router-link>
        
    </div>
    <!-- 订单 -->
    <div class="bgw mb10">
      <div class="mlr20 pg5 borderB b-v-center"><p class="iconfont fs25 colorG1">&#xe627;</p><p>我的订单</p></div>
      <div class="b-center ptb20">
        <router-link :to="{name:'orderList',params:{title:'我的订单',orderId:'待付款'}}" tag="div" class="flex tc">
          <p class="iconfont fs30 ">&#xe63f;</p>
          <p>待付款</p>
        </router-link>
        <router-link :to="{name:'orderList',params:{title:'我的订单',orderId:'待收货'}}" tag="div" class="flex tc">
          <p class="iconfont fs30 ">&#xe601;</p>
            <p>待收货</p>
        </router-link>
        <router-link :to="{name:'orderList',params:{title:'我的订单',orderId:'已完成'}}" tag="div" class="flex tc">
          <p class="iconfont fs30 colorG2">&#xe62f;</p>
            <p>已完成</p>
        </router-link>
      </div>
    </div>
    <!-- 折扣 -->
    <div class="bgw mb10">
      <div class="plr20 pg5 borderB b-v-center"><p class="iconfont fs25 colorO1">&#xe606;</p><p>我的折扣</p></div>
      <div class="pl30 ptb20">
        <router-link :to="{name:'mySpend',params:{title:'我的消费'}}" tag="div" class="b-v-center">
          <p class="flex">我的消费</p>
          <p >￥300.00</p>     
          <p class="mlr10 iconfont">&#xe60d;</p>     
        </router-link>
        <router-link :to="{name:'friendSpend',params:{title:'朋友的消费'}}" tag="div" class="b-v-center mt10">
          <p class="flex">朋友的消费</p>
          <p >￥300.00</p>     
          <p class="mlr10 iconfont">&#xe60d;</p>     
        </router-link>
        <router-link :to="{name:'preferLevel',params:{title:'优惠等级'}}" tag="div" class="b-v-center mt10">
          <p class="flex">优惠等级</p>
          <p >四级/20%</p>     
          <p class="mlr10 iconfont">&#xe60d;</p>     
        </router-link>
      </div>
    </div>
    <!-- 其他 -->
    <div class="bgw mb10 ">
      <div class="plr20 pg5 borderB b-v-center"><p class="iconfont fs25 colorG2">&#xe804;</p><p>其它</p></div>
      <div class="b-center ptb20">
        <router-link :to="{name:'addressList',params:{title:'地址管理'}}" tag="div" class="flex tc">
          <p class="iconfont fs20 bgPurple bR5 colorw">&#xe622;</p>
            <p>收货地址</p>
        </router-link>
        <router-link to="" tag="div" class="flex tc">
          <p class="iconfont fs20 bgOrange bR5 colorw">&#xe7aa;</p>
            <p>我的评价</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import lrLayout from "./personal/lrLayout.vue";
export default {
  name: "Me",
  data() {
    return {
      lrObj: {
        textL: "头像",
        textR: require("../assets/logo.png"),
        img: true,
        arrowR: true,
        border: true,
        router: ""
      }
    };
  },
  components: {
    lrLayout
  },
  computed: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.me {
  background: #eee;
  overflow: hidden;
  // height: calc(100vh - 50px);
  // margin-bottom: 50px;
  .imgHeader {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    background: #000000;
  }
  .bgPurple{
    background: #a7b2e0;
    width: 33px;
    margin: auto;
    height: 33px;
    margin-bottom: 10px;
  }
  .bgOrange{
    background: #ffbe5a;
    width: 33px;
    margin: auto;
    height: 33px;
    margin-bottom: 10px;
  }
}
</style>

