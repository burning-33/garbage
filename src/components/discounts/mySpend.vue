<template>
  <div class="mySpend">
      <!-- 头部 -->
    <div class="b-center mtb10 bgw ptb15 borderTB myHead">
      <p class="fs16 colorb mr40">总消费金额</p>
      <p class="colorEF fontB fs30">￥300.00</p>
    </div>
    <!-- 消费记录 -->
    <div class="bgw">
        <div class="mlr20 pg5 borderB b-v-center"><p class="iconfont fs25 colorEF mr3">&#xe62d;</p><p class="color333 fs16">消费记录</p></div>
        <div class="pg10"> 
            <van-row class="tc">
                <van-col span="8" class="color333">订单编号</van-col>
                <van-col span="6" class="color333">付款时间</van-col>
                <van-col span="5" class="color333">实付</van-col>
                <van-col span="5" class="color333">付款方式</van-col>
            </van-row>
            <van-row class="tc mt10" v-for="(item,index) in spendInfo" :key="index">
                <van-col span="8">{{item.orderId}}</van-col>
                <van-col span="6">{{item.time}}</van-col>
                <van-col span="5">{{item.money}}</van-col>
                <van-col span="5">{{item.method}}</van-col>
            </van-row>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mySpend",
  data() {
    return {
        spendInfo:[
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'},
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'},
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'},
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'},
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'},
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'},
            {orderId:'76113675032',time:'2018-06-1',money:'20.00',method:'微信支付'}           
        ]
    };
  },
  methods: {
  }
};
</script>


<style lang="less" scoped>
.mySpend {
  background: #eee;
  overflow: hidden;
  height: 100%;
  .myHead{
      height:93px;
  }
  .colorEF{
      color: #ef675d
  }
}
</style>

