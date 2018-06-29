<template>
  <div class="mySpend">
      <!-- 头部 -->
    <div class="b-center mtb10 bgw ptb15 borderTB myHead">
      <p class="fs16 colorb mr40">总消费金额</p>
      <p class="colorEF fontB fs30">￥{{total}}</p>
    </div>
    <!-- 消费记录 -->
    <div class="mlr10 plr5 b-v-center"><p class="iconfont fs25 colorEF mr3">&#xe62d;</p><p class="color333 fs16">消费明细</p></div>
    <div class="b-center bgw mb10 borderTB tc">
        <p @click="changeState" data-id='0' :class="isActive==0?'flex isActive colorEF':'flex nospend colorEF'">已消费</p>
        <p @click="changeState" data-id='1' :class="isActive==1?'flex isActive borderL color8b':'flex nospend borderL color8b'">未消费</p>
    </div>
    <div class="bgw">
        
        <div class="pb10 pt5"> 
            <van-row class="tc borderB pb5">
                <van-col span="7" class="color333 ptb5">昵称</van-col>
                <van-col span="9" class="color333 ptb5">加入时间</van-col>
                <van-col span="8" class="color333 ptb5">{{isActive == 1?'联系电话':'消费金额'}}</van-col>
            </van-row>
            <van-row class="tc mt10" v-for="(item,index) in spendInfo" :key="index">
                <van-col  span="7">{{item.nickname}}</van-col>
                <van-col  span="9">{{item.regdate}}</van-col>
                <van-col span="8">{{isActive == 0? Number(item.money):item.mobile}}</van-col>
            </van-row>
        </div>
        <infinite-loading @infinite="getspendInfo" spinner="waveDots" ref="InfiniteLoading">
        <span slot="no-results">
          当前还没有相关订单~
        </span>
          <span slot="no-more">
          已经到底了~
        </span>
        </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "mySpend",
  data() {
    return {
      spendInfo: [
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        },
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        },
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        },
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        },
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        },
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        },
        {
          name: "小李子",
          time: "2018-06-1",
          money: "20.00",
          phone: "13547393115"
        }
      ],
      isActive: 0,
      total: "",
      page:1
    };
  },
  methods: {
    changeState(e) {
      this.isActive =
        this.isActive == e.target.dataset.id ? this.isActive : e.target.dataset.id;
      // this.getspendInfo();
      this.page = 1;
      this.spendInfo = [];
      this.$nextTick(() => {
        this.$refs.InfiniteLoading.$emit('$InfiniteLoading:reset');
      });
    },
    getspendInfo($state) {
      let _this = this;
      if (this.isActive == 0) {
        _this.$fetch(_this.GLOBAL.base_url + "consumption_friend", {
            token: _this.GLOBAL.token,
            type: "已消费",
            p: _this.page,
            row: 2
          })
          .then(res => {
            console.log("已消费", res);
            if (res.code == 200) {
              _this.total = Number(res.data.all_price.money);
              _this.spendInfo = _this.spendInfo.concat(res.data.list);
              _this.page++;
              if (_this.page > res.data.totalPages) {
                $state.complete();
              } else {
                $state.loaded();
              }
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        _this.$fetch(_this.GLOBAL.base_url + "consumption_friend", {
            token: _this.GLOBAL.token,
            type: "未消费",
            p: _this.page,
            row: 2
          })
          .then(res => {
            console.log("未消费", res);
            if (res.code == 200) {
              _this.total = Number(res.data.all_price.money);
              _this.spendInfo = _this.spendInfo.concat(res.data.list);
              _this.page++;
              if (_this.page > res.data.totalPages) {
                $state.complete();
              } else {
                $state.loaded();
              }
            } else {
              Toast(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    // this.getspendInfo();
  },
  components:{
    InfiniteLoading
  }
};
</script>


<style lang="less" scoped>
.mySpend {
  background: #eee;
  overflow: hidden;
  height: 100%;
  .myHead {
    height: 93px;
  }

  .color333 + .color333 {
    border-left: 1px solid #dfdfdf;
  }
  .isActive {
    height: 38px;
    background: #e9f4f4;
    line-height: 38px;
  }
  .colorEF {
    color: #ef675d;
  }
  .nospend {
    height: 38px;
    line-height: 38px;
  }
  .borderL {
    border-left: 1px solid #dfdfdf;
  }
  .middle{
    
  }
}
</style>

