<template>
  <div class="preferLevel">
      <!-- 头部 -->
    <div class=" ptb15 myHead tc">
      <van-circle class="mtb10 circle" slot="当前折扣" size="120px" color="#83ba25" layer-color="#ccc" v-model="currentRate" :rate="25" :speed="100" :text="text"/>
      <p class="tc colorEF">再消费{{upgrade}}可升级</p>
    </div>
    <div class="b-center bgeee ptb8">
        <div class="flex tc">
            <p class="fs12 color999">共计消费</p>
            <p class="color333 mt5 fontB">￥{{total}}</p>
        </div>
        <div class="flex tc">
            <p class="fs12 color999">优惠等级</p>
            <p class="color333 mt5 fontB">{{level}}级</p>
        </div>
    </div>
    <!-- 优惠规则 -->
    <div class="plr15">
        <div class="borderGL plr3 mtb5 color999">优惠规则</div>
        <div v-for="(item,index) in rule" :key="index" class="mb10">
            <div class="b-v-center fontB ">
                <p class="color333 flex fs16">{{item.level}}</p>
                <p class="tr colorEF flex fs16">{{item.value}}</p>
            </div>
            <p class="mt10 fs12">{{item.text}}</p>
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
        upgrade:700,
        total:3000,
        level:3,
        rule:[
            {level:'一级',value:'5%',text:'个人消费+朋友消费总和达到：1000元，即可享受购物5%的优惠'},
            {level:'二级',value:'10%',text:'个人消费+朋友消费总和达到：2000元，即可享受购物10%的优惠'},
            {level:'三级',value:'15%',text:'个人消费+朋友消费总和达到：3000元，即可享受购物15%的优惠'},
            {level:'四级',value:'20%',text:'个人消费+朋友消费总和达到：4000元，即可享受购物20%的优惠'}
        ]
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + '%'
    }
  },
  methods: {
  },
  created(){

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

