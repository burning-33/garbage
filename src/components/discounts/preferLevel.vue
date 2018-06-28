<template>
  <div class="preferLevel">
      <!-- 头部 -->
    <div class=" ptb15 myHead tc">
      <van-circle class="mtb10 circle" slot="当前折扣" size="120px" color="#83ba25" layer-color="#ccc" v-model="currentRate" :rate="rate" :speed="30" :text="text">
      </van-circle>
      <p class="tc colorEF">再消费{{upgrade}}可升级</p>
    </div>
    <div class="b-center bgeee ptb8">
        <div class="flex tc">
            <p class="fs12 color999">共计消费</p>
            <p class="color333 mt5 fontB">￥{{total}}</p>
        </div>
        <div class="flex tc">
            <p class="fs12 color999">优惠等级</p>
            <p class="color333 mt5 fontB">{{level}}</p>
        </div>
    </div>
    <!-- 优惠规则 -->
    <div class="plr15">
        <div class="borderGL plr3 mtb5 color999">优惠规则</div>
        <div v-for="(item,index) in rule" :key="index" class="mb10">
            <div class="b-v-center fontB ">
                <p class="color333 flex fs16">{{item.name}}</p>
                <p class="tr colorEF flex fs16">{{(Number(item.discount)*100).toFixed(0)}}%</p>
            </div>
            <p class="mt10 fs12">个人消费+朋友消费总和达到：{{item.money}}元，即可享受购物{{(Number(item.discount)*100).toFixed(0)}}%的优惠</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "preferLevel",
  data() {
    return {
        currentRate: 0,
        upgrade:0,
        total:0,
        level:0,
        rate:0,
        rule:[
            // {level:'一级',value:'5%',text:'个人消费+朋友消费总和达到：1000元，即可享受购物5%的优惠'},
            // {level:'二级',value:'10%',text:'个人消费+朋友消费总和达到：2000元，即可享受购物10%的优惠'},
            // {level:'三级',value:'15%',text:'个人消费+朋友消费总和达到：3000元，即可享受购物15%的优惠'},
            // {level:'四级',value:'20%',text:'个人消费+朋友消费总和达到：4000元，即可享受购物20%的优惠'}
        ]
    };
  },
  computed: {
    text() {
        // console.log(this.currentRate)
        // console.log((Number(this.currentRate)*100).toFixed(0) + '%')
      return (Number(this.currentRate)).toFixed(0) + '%'
    }
  },
  methods: {
  },
  created(){
      let _this=this;
      _this.$fetch(_this.GLOBAL.base_url+'level',{token: _this.GLOBAL.token})
      .then(res => {
            console.log('优惠等级',res);
            if (res.code == 200) {
              _this.rule = res.data.level;
              _this.rate = Number((res.data.user.discount*100).toFixed(0));
              _this.upgrade = res.data.user.diff;
              _this.level = res.data.user.name;
              _this.total = res.data.user.all_money;
            }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>


<style lang="less" scoped>
.preferLevel {
  .myHead{
      height: 170px;
    .circle{
        width: 120px;
        height: 120px;
        margin: 0 auto;
    }
  }
  .borderGL{
      border-left: 3px solid #8bc34a;
  }
}
</style>

