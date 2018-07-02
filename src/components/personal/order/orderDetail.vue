<template>
    <div class="orderDetail">
        <div class="ptb10 pl1 mlr15 borderB head">
            <p class="colorG">订单详情</p>
        </div>
        <div class="plr15 ptb10 b-v-center borderT10 goodsItem" @click="toDetails(item.id)" v-for="(childItem,childIndex) in detailObj.item" :key="childIndex">
              <div class="imgOrder"><img  :src="childItem.goods_image" alt=""></div>
              <div class="flex ml15">
                  <p class="fs15 color333 ellipsis" style="width:255px;height:27px;">{{childItem.goods_name}}</p>
                  <p class="flex fs12">规格：{{childItem.goods_format}}</p>
                  <div class="b-v-center">
                      <p class="flex fs12">颜色分类：{{childItem.goods_color}}</p>
                      <p class="flex tr fs12 line-through">￥{{childItem.goods_price}}</p>
                  </div>
                  <div class="b-v-center">
                      <p class="flex fs12">数量：{{childItem.item_num}}</p>
                      <p class="tr flex fs12 color333">￥{{childItem.goods_money}}</p>
                  </div>
              </div>
          </div>
        <div class="plr15 pt5 b-v-center">
              <p class="flex">商品总价:</p>
              <p class="tr colorEF flex">￥{{detailObj.all_money}}</p>
        </div>
        <div class="plr15 pt5 b-v-center">
              <p class="flex">运费金额:</p>
              <p class="tr colorEF flex">￥{{detailObj.freight}}</p>
        </div>
        <div class="plr15 ptb5 b-v-center ">
              <p class="flex color333">优惠金额:</p>
              <p class="tr colorO1 flex ">￥-{{detailObj.discount}}</p>
        </div>
        <div class="mlr15 pt5 b-v-center borderT">
              <p class="flex color333 fs16">订单总价:</p>
              <p class="tr colorRed flex">￥{{detailObj.all_price}}</p>
        </div>
        <div class="bgfe pg15 mt40">
            <p>订单编号:{{detailObj.number}}</p>
            <p>下单时间:{{detailObj.create_time}}</p>
            <p>支付时间:{{detailObj.pay_time}}</p>
            <p>发货时间:{{detailObj.update_time}}</p>
        </div>
    </div>
</template>
<script>
import { Toast } from "vant";
export default {
    data(){
        return{
            orderId:0,
            detailObj:[]
        }
    },
    created(){
        let _this = this;
        _this.orderId = _this.$route.params.orderId;
        _this.$fetch(_this.GLOBAL.base_url+'info',{
            token:_this.GLOBAL.token,
            id:_this.orderId
        })
        .then(res => {
            console.log("订单详情", res);
            if(res.code == 200){
                _this.detailObj = res.data;
            }else{
                Toast(res.msg);
            }
        })
        .catch(err => {
          console.log(err);
          Toast("网络错误");
        });
    }
}
</script>
<style lang="less" scoped>
.orderDetail{
    .colorG{
        color: #6db655;
    }
    .head{
        position: relative;
    }
    .head::after{
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100px;
        height: 1px;
        background-color: #6db655;
    }
    .mt40{
        margin-top: 50px;
    }
    .goodsItem + .goodsItem{
      border-bottom: 10px solid #f9f9f9;
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


