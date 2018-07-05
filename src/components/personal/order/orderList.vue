<template>
  <div class="orderList">
      <!-- 导航 -->
      <div class="navStyle bgw">
          <div class="b-v-center ptb10 borderB">
                <p @click="changeNav(index)" v-for="(item,index) in navBar" :key="index" :class="selectedIndex == index?'flex tc navClass':'flex tc'">{{item}}</p>
            </div>
      </div>
      
      <!-- 内容 -->
      <div class="content">
          <div class="details" v-for="(item,index) in orderList" :key="index">
            <div class="plr15 ptb10 b-v-center">
              <p class="flex">订单编号：{{item.number}}</p>
              <p class="tr colorEF">{{showStatus}}</p>
            </div>
            <div class="plr15 ptb10 b-v-center bgfe goodsItem" @click="toDetails(item.id)" v-for="(childItem,childIndex) in item.item" :key="childIndex">
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
            <div class="b-center plr15 ptb10 borderB ">
                <p class="flex tr">优惠：￥{{item.discount}}</p>
                <p class="flex tr">实付：<span class="fs16 colorRed">￥{{item.all_price}}</span></p>
            </div>
            <div class=" ptb10 borderB10 overflow">
                <button @click="payMoney(btnItem.text,item.id)" :class="btnItem.color?'colorRed bR5 bgw borderR mr15 btnOrder fr':'bR5 bgw mr15 btnOrder border666 fr'" v-for="(btnItem,btnIndex) in btnArr" :key="btnIndex">{{btnItem.text}}</button>
            </div>
          </div>
      </div>
      <infinite-loading @infinite="getOrderList" spinner="waveDots" ref="InfiniteLoading">
        <span slot="no-results">
          当前没有相关订单~
        </span>
          <span slot="no-more">
          已经到底了~
        </span>
        </infinite-loading>
      <ymalert ref="alert" :modal="alertText" />
      <ymDialog ref="dialog" :modal="modal" />
  </div>
</template>

<script>
import { Toast } from "vant";
import ymDialog from "../../common/dialog";
import ymalert from "../../common/alert";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "orderList",
  data() {
    return {
      navBar: ["全部", "待付款", "待收货", "已完成"],
      navId: 1,
      selectedIndex: 0,
      reducePrice: 0,
      btnArr: [],
      showStatus: "待付款",
      page:1,
      orderList: [
      ],
      modal: {
        confirmText: "已收货",
        contentText: "确认收货",
        cancelText: "未收货",
        red: false
      },
      alertText: {
        alertMsg: "请致电",
        service: true
      }
    };
  },
  components: {
    ymDialog,
    ymalert,
    InfiniteLoading
  },
  methods: {
    getOrderList($state) {
      let _this = this;
      console.log(_this.selectedIndex,'selectedIndex')
      _this.$fetch(_this.GLOBAL.base_url + "order", {
          token: _this.GLOBAL.token,
          status: _this.selectedIndex,
          p: _this.page,
          row: 3
        })
        .then(res => {
          console.log("订单列表", res);
          if (res.code == 200) {
            _this.orderList = _this.orderList.concat(res.data.list);
            if(res.data.list.length == 0){
                res.data.all_page = 0
            }else{
              if (res.data.list[0].status == 1) {
                  // 待付款              
                    _this.btnArr = [
                      { text: "去付款", color: true}
                    ];
                } else if (res.data.list[0].status == 2) {
                  //待收货
                    _this.btnArr = [
                      { text: "查看物流", color: true },
                      { text: "确认收货", color: false}
                    ];
                }else if (res.data.list[0].status == 3) {
                  // 已完成
                    _this.btnArr = [
                      { text: "再次购买", color: false },
                      { text: "去评价", color: true },
                      { text: "申请售后", color: false }
                    ];
                }else if (res.data.list[0].status == 4) {
                  // 已完成
                    _this.btnArr = [
                      { text: "申请售后", color: false},
                      { text: "已评价", color: false },
                      { text: "再次购买", color: false},
                    ];
                }
            }
            _this.page++;
            if (_this.page > res.data.all_page) {
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
          Toast("网络错误");
        });
    },
    toDetails(id){
      this.$router.push({
        name:'orderDetail',
        params:{title:'商品详情',orderId:id}
      })
    },
    changeNav(index) {
      this.selectedIndex =
        this.selectedIndex == index ? this.selectedIndex : index;
      this.changeStatus(this.selectedIndex);
    },
    changeStatus(selected) {
      this.navId = selected;
      this.showStatus =
        selected == 1 ? "等待付款" : selected == 2 ? "已发货" : "已完成";
        this.page = 1;
        this.orderList = [];
        this.$nextTick(() => {
          this.$refs.InfiniteLoading.$emit('$InfiniteLoading:reset');
        });
      // this.getOrderList();
    },
    payMoney(text,id) {
      let _this = this;
      console.log(id)
      if (text == "去付款") {
        // 跳转到确认订单页面
      } else if (text == "查看物流") {
        // 跳转到确认物流页面
        this.$router.push({
          name: "logistics",
          params: { title: "物流详情" }
        });
      } else if (text == "确认收货") {
        this.$refs.dialog
          .confirm()
          .then(() => {
            _this.$post(_this.GLOBAL.base_url+'confirm',{
              token: _this.GLOBAL.token,
              id:id
            })
            .then(res => {
              if(res.code == 200){
                _this.selectedIndex = 3
                _this.page = 1;
                _this.orderList = [];
                _this.$nextTick(() => {
                  _this.$refs.InfiniteLoading.$emit('$InfiniteLoading:reset');
                });
              }
            })
            .catch(err => {
              console.log(err);
            })
          })
          .catch(() => {
          });
      } else if (text == "再次购买") {
        // 跳转到商品详情页面
      } else if (text == "去评价") {
        // 跳转到评价页面
        this.$router.push({
          name: "toReview",
          params: { title: "评价订单",orderId:id }
        });
      } else if (text == "申请售后"){
        // 售后
        this.$refs.alert
          .hand()
          .then(() => {})
          .catch(() => {});
      }
    }
  },
  created() {
    let _this = this;
    if (this.$route.params.orderId !== undefined) {
      this.selectedIndex =
        this.$route.params.orderId == "待付款"
          ? 1
          : this.$route.params.orderId == "待收货" ? 2 : 3;
      this.changeStatus(this.selectedIndex);
    }
    // this.getOrderList();
  }
};
</script>


<style lang="less" scoped>
.orderList {
  .navStyle {
    width: 100%;
    position: fixed;
    top: 50px;
    left: 0;
    .navClass {
      position: relative;
      color: #8bc34a;
    }
    .navClass::after {
      content: "";
      width: 38px;
      height: 3px;
      background-color: #8bc34a;
      position: absolute;
      bottom: -11px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  .content {
    margin-top: 41px;
    .goodsItem + .goodsItem{
      margin-top: 10px;
    }
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

