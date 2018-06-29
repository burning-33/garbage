<template>
  <div class="review">
      <!-- 内容 -->
      <div class="content">
          <div class="details borderB10" v-for="(item,index) in orderList" :key="index">
            <div class="plr15 ptb10 b-v-center">
              <p class="flex">订单编号：{{item.order_id}}</p>
              <p class="tr colorEF flex">{{item.create_time}}2013-12-21 14:00</p>
            </div>
            <div class="plr15 ptb10 b-v-center bgfe">
                <div class="imgOrder"><img  :src="item.img" alt=""></div>
                <div class="flex ml15">
                    <p class="fs15 color333 ellipsis" style="width:255px;height:27px;">{{item.name}}</p>
                    <p class="flex fs12">尺寸：{{item.size}}</p>
                    <div class="b-v-center">
                        <p class="flex fs12">颜色分类：{{item.color}}</p>
                        <p class="flex tr fs12 line-through">￥{{item.original}}</p>
                    </div>
                    <div class="b-v-center">
                        <p class="flex fs12">数量：{{item.num}}</p>
                        <p class="tr flex fs12 color333">￥{{item.current}}</p>
                    </div>
                </div>
            </div>
            <div class="plr15 ptb10 b-v-center">
              <p class="flex">我的评价</p>
              <p class="tr colorEF flex">{{item.create_time}}(1021) <span class="iconfont fs18 colorRed">&#xe677;</span> </p>
            </div>
            <div class="plr15 pb10">
                <p class="color333">东西很不错，可以装很多东西，而且还特别结实，赞一个,下次还会购买。</p>
                <p class="tr pr15">2013-12-21 14:00</p>
            </div>
          </div>
      </div>
      <!-- <infinite-loading @infinite="getOrderList" spinner="waveDots" ref="InfiniteLoading">
        <span slot="no-results">
          您还没有评论商品~
        </span>
          <span slot="no-more">
          已经到底了~
        </span>
        </infinite-loading> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import ymDialog from "../common/dialog";
import ymalert from "../common/alert";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "orderList",
  data() {
    return {
      
      page:1,
      orderList: [
        {
          order_id: "454545",
          status: 1,
          img: require("./order/goods.png"),
          name: "全生物降解垃圾袋家用塑料袋加厚中号绿色环保一次性袋厨房...",
          size: "M",
          color: "绿色",
          original: 30.0,
          num: 1,
          current: 20.0,
          actually: 11.0
        },
        {
          order_id: "454545",
          status: 2,
          img: require("./order/goods.png"),
          name: "全生物降解垃圾袋家用塑料袋加厚中号绿色环保一次性袋厨房...",
          size: "M",
          color: "绿色",
          original: 30.0,
          num: 1,
          current: 20.0,
          actually: 11.0
        },
        {
          order_id: "454545",
          status: 3,
          img: require("./order/goods.png"),
          name: "全生物降解垃圾袋家用塑料袋加厚中号绿色环保一次性袋厨房...",
          size: "M",
          color: "绿色",
          original: 30.0,
          num: 1,
          current: 20.0,
          actually: 11.0
        }
      ],
    };
  },
  components: {
    ymDialog,
    ymalert,
    InfiniteLoading
  },
  methods: {
    
  },
  created() {
    let _this = this;
    
  }
};
</script>


<style lang="less" scoped>
.review {
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
  .bgfe{
      background-color: #f9f9f9;
  }
}
</style>

