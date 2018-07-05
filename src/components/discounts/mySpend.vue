<template>
  <div class="mySpend">
      <!-- 头部 -->
    <div class="b-center mtb10 bgw ptb15 borderTB myHead">
      <p class="fs16 colorb mr40">总消费金额</p>
      <p class="colorEF fontB fs30">￥{{total}}</p>
    </div>
    <!-- 消费记录 -->
    <div class="bgw">
        <div class="mlr20 pg5 borderB b-v-center"><p class="iconfont fs25 colorEF mr3">&#xe62d;</p><p class="color333 fs16">消费记录</p></div>
        <div class="pg10"> 
            <van-row class="tc">
                <van-col span="9" class="color333">订单编号</van-col>
                <van-col span="5" class="color333">付款时间</van-col>
                <van-col span="5" class="color333">实付</van-col>
                <van-col span="5" class="color333">付款方式</van-col>
            </van-row>
             <div class="scroll">
                <van-row class="tc mt10" v-for="(item,index) in spendInfo" :key="index">
                    <van-col span="9">{{item.number}}</van-col>
                    <van-col span="5">{{item.pay_time}}</van-col>
                    <van-col span="5">{{item.all_price}}</van-col>
                    <van-col span="5">{{item.pay_type}}</van-col>
                </van-row>
                <infinite-loading @infinite="getspendInfo" spinner="waveDots" ref="InfiniteLoading">
                    <span slot="no-results">
                      当前还没有消费记录~
                    </span>
                      <span slot="no-more">
                      已经到底了~
                    </span>
                  </infinite-loading>
              </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "mySpend",
  data() {
    return {
        total:0,
        spendInfo:[          
        ],
        page:1,
        pageSize:2
    };
  },
  components:{
      InfiniteLoading
  },
  methods: {
    getspendInfo($state){
      let _this = this;
      _this.$fetch(_this.GLOBAL.base_url + "consumption", {
          token: _this.GLOBAL.token,
          p:_this.page,
          row:_this.pageSize
          })
        .then(res => {
          console.log('我的消费',res);
          if(res.code == 200){
             _this.total = res.data.all_price?res.data.all_price:0
            _this.spendInfo = _this.spendInfo.concat(res.data.list);
            _this.page++;
              if (_this.page > res.data.all_page) {
                $state.complete();
              } else {
                $state.loaded();
              }
          }else{
            Toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
  .scroll{
    height: 64vh;
    overflow: auto;
  }
  .colorEF{
      color: #ef675d
  }
}
</style>

