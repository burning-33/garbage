<template>
  <div class="orderList">
      <!-- 内容 -->
      <div class="content">
          <div class="details" v-for="(item,index) in reviewList" :key="index">
            <div class="plr15 ptb10">
              <p class="flex">订单编号：{{item.number}}</p>
            </div>
            <div class="plr15 ptb10 b-v-center bgfe goodsItem" >
                <div class="imgOrder"><img  :src="item.goods_image" alt=""></div>
                <div class="flex ml15">
                    <p class="fs15 color333 ellipsis" style="width:255px;height:27px;">{{item.goods_name}}</p>
                    <p class="flex fs12">规格：{{item.goods_format}}</p>
                    <div class="b-v-center">
                        <p class="flex fs12">颜色分类：{{item.goods_color}}</p>
                        <p class="flex tr fs12 line-through">￥{{item.goods_price}}</p>
                    </div>
                    <div class="b-v-center">
                        <p class="flex fs12">数量：{{item.item_num}}</p>
                        <p class="tr flex fs12 color333">￥{{item.goods_money}}</p>
                    </div>
                </div>
            </div>
            <div class=" ptb10 borderB10 overflow">
                <button @click="review(item.id)" class="colorRed bR5 bgw borderR mr15 btnOrder fr" >评价订单</button>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "orderList",
  data() {
    return {
      reviewList: [],
      orderId:null
    };
  },
  components: {
  },
  methods: {
      review(id){
          let obj={}
          for(let i = 0;i<this.reviewList.length;i++){
              if(id = this.reviewList[i].id){
                  obj = this.reviewList[i]
              }
          }
          this.$router.push({
              name:'writingReview',
              params:{title:'撰写评价',reviewObj:obj,orderId:this.orderId}
          })
      }
  },
  created() {
    let _this = this;
    _this.orderId = _this.$route.params.orderId;
    _this.$fetch(_this.GLOBAL.base_url+'item',{
              token: _this.GLOBAL.token,
              id:_this.$route.params.orderId
            })
            .then(res => {
              if(res.code == 200){
                _this.reviewList = res.data
              }else{
                  Toast(res.msg)
              }
            })
            .catch(err => {
              console.log(err);
            })
  }
};
</script>


<style lang="less" scoped>
.orderList {
    .goodsItem + .goodsItem{
        margin-top: 10px;
    }
  .imgOrder > img {
    width: 75px;
    height: 75px;
  }
  .line-through {
    text-decoration: line-through;
  }
  .btnOrder {
    width: 75px;
    height: 25px;
  }
  .borderR {
    border: 1px solid #fb4e26;
  }
  .border666 {
    border: 1px solid #666;
  }
}
</style>

