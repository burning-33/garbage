<template>
  <div class="me">
    
    <!-- 头部 -->
    <div class="b-v-center mtb10 bgw ptb15 borderTB">
      <div class="imgHeader mlr20">
        <img src="../assets/logo.png" alt="">
      </div>
      <router-link :to="{name:'PersonalInfo',params:{title:'个人信息',userInfo:user}}" tag="div" class="b-v-center flex">
        <div class="flex">
          <div>昵称： <span>{{user.nickname}}</span></div>
          <div>会员ID: <span>{{user.id}}</span></div>
        </div>
        <div class="mlr10 iconfont"><span>&#xe60d;</span></div>
      </router-link>
        
    </div>
    <!-- 订单 -->
    <div class="bgw mb10">
      <div class="mlr20 pg5 borderB b-v-center"><p class="iconfont fs25 colorG1">&#xe627;</p><p>我的订单</p></div>
      <div class="b-center ptb20">
        <router-link :to="{name:'orderList',params:{title:'我的订单',orderId:'待付款'}}" tag="div" class="flex tc">
          <p class="iconfont fs30 iconNUm">&#xe63f;<span v-if="order.obligation" class="count">{{order.obligation}}</span></p>
          <p>待付款</p>
        </router-link>
        <router-link :to="{name:'orderList',params:{title:'我的订单',orderId:'待收货'}}" tag="div" class="flex tc">
          <p class="iconfont fs30 iconNUm">&#xe601;<span v-if="order.receive" class="count">{{order.receive}}</span></p>
          <p>待收货</p>
        </router-link>
        <router-link :to="{name:'orderList',params:{title:'我的订单',orderId:'已完成'}}" tag="div" class="flex tc">
          <p class="iconfont fs30 colorG2 iconNUm">&#xe62f;<span v-if="order.complete" class="count">{{order.complete}}</span></p>
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
          <p >￥{{consumption.myself?consumption.myself:0}}</p>     
          <p class="mlr10 iconfont">&#xe60d;</p>     
        </router-link>
        <router-link :to="{name:'friendSpend',params:{title:'朋友的消费'}}" tag="div" class="b-v-center mt10">
          <p class="flex">朋友的消费</p>
          <p >￥{{consumption.friend?consumption.friend:0}}</p>     
          <p class="mlr10 iconfont">&#xe60d;</p>     
        </router-link>
        <router-link :to="{name:'preferLevel',params:{title:'优惠等级'}}" tag="div" class="b-v-center mt10">
          <p class="flex">优惠等级</p>
          <p >{{levelname}}/{{leveldiscount}}</p>     
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
        <router-link :to="{name:'review',params:{title:'我的评价'}}" tag="div" class="flex tc">
          <p class="iconfont fs20 bgOrange bR5 colorw">&#xe7aa;</p>
            <p>我的评价</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import lrLayout from "./personal/lrLayout.vue";
export default {
  name: "Me",
  data() {
    return {
      consumption:{},
      order:{
        obligation:0,
        receive:0,
        complete:0
      },
      user:{},
      levelname:'0级',
      leveldiscount:'0'
    };
  },
  components: {
    lrLayout
  },
  created(){
    let _this = this;
    console.log(_this.GLOBAL.token)
    if(_this.GLOBAL.token =='' || _this.GLOBAL.token === null){
      Toast('您还未登录，请先登录')
      setTimeout(function(){
        _this.$router.replace(
          { name: 'login', params: { title: '登录' }}
        )
      },3000)
    }else{
      _this.$fetch(_this.GLOBAL.base_url+'member',{token: _this.GLOBAL.token})
      .then(res => {
            console.log('个人中心',res);
            if (res.code == 200) {
              _this.user = res.data.user
              for(let i = 0;i<res.data.order.length;i++){
                if(res.data.order[i].status == 1){
                  _this.order.obligation = res.data.order[i].all_count
                }else if(res.data.order[i].status == 2){
                  _this.order.receive = res.data.order[i].all_count
                }else if(res.data.order[i].status == 3){
                  _this.order.complete = res.data.order[i].all_count
                }
              }
              _this.consumption = res.data.consumption;
              if(res.data.user.level){
                console.log('true')
                _this.levelname = res.data.user.level.name
                _this.leveldiscount = Number(res.data.user.level.name*100).toFixed(1)+'%'
              }else{
                console.log('false')              
              }
            }
      })
      .catch(err => {
        console.log(err);
        Toast('网络错误')
      });
    }
    
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.me {
  background: #eee;
  overflow: hidden;
  .imgHeader {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    background: #000000;
  }
  .iconNUm{
    position: relative;
  }
  .count{
    font-size: 6px;
    position: absolute;
    top: 2px;
    right: 42px;
    color: #fff;
    text-align: center;
    background-color: red;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    line-height: 15px;
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

