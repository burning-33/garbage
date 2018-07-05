<template>
  <div class="review">
      <!-- 内容 -->
      <div class="content">
          <div class="details borderB10" v-for="(item,index) in reviewList" :key="index">
            <div class="plr15 ptb10 b-v-center">
              <p class="flex">订单编号：{{item.order_number}}</p>
              <p class="tr colorEF flex">{{item.order_time}}</p>
            </div>
            <div class="plr15 ptb10 b-v-center bgfe">
                <div class="imgOrder"><img  :src="item.goods_image" alt=""></div>
                <div class="flex ml15">
                    <p class="fs15 color333 ellipsis" style="width:255px;height:27px;">{{item.goods_name}}</p>
                    
                    <div class="b-v-center">
                        <p class="flex fs12">规格：{{item.goods_format}}</p>
                        <p class="flex tr fs12 line-through">￥{{item.goods_price}}</p>
                    </div>
                    <div class="b-v-center">
                        <!-- <p class="flex fs12">数量：1</p> -->
                        <p class="flex fs12">颜色分类：{{item.goods_color}}</p>
                        <p class="tr flex fs12 color333">￥{{item.goods_money}}</p>
                    </div>
                </div>
            </div>
            <div class="plr15 ptb10 b-v-center">
              <p class="">我的评价</p>
              <p class="tr colorEF flex">({{item.num}}) <span class="iconfont fs18 colorRed">&#xe677;</span> </p>
            </div>
            <div class="plr15 pb10">
                <p class="color333">{{item.content}}</p>
                <p class="tr pr15">{{item.create_time}}</p>
            </div>  
          </div>
      </div>
      <infinite-loading @infinite="getreviewList" spinner="waveDots" ref="InfiniteLoading">
        <span slot="no-results">
          您还没有评论任何订单~
        </span>
          <span slot="no-more">
          已经到底了~
        </span>
        </infinite-loading>
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
      pageSize:2,
      reviewList: [],
    };
  },
  components: {
    ymDialog,
    ymalert,
    InfiniteLoading
  },
  methods: {
    getreviewList($state){
        let _this = this;
    _this.$fetch(_this.GLOBAL.base_url + 'comment_member',{
      token:_this.GLOBAL.token,
      p:this.page,
      row:this.pageSize
    })
    .then(res => {
      console.log('评论列表',res);
        if (res.code == 200) {
          _this.reviewList = _this.reviewList.concat(res.data.list);
          _this.page++;
              if (_this.page > res.data.all_page || res.data.all_page === '') {
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
    })
    }
  },
  created() {
    
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

