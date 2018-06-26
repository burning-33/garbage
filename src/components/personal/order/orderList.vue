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
              <p class="flex">订单编号：{{item.order_id}}</p>
              <p class="tr colorEF flex">{{showStatus}}</p>
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
          <div class="b-center plr15 ptb10 borderB ">
              <p class="flex tr">优惠：￥{{reducePrice}}</p>
              <p class="flex tr">实付：<span class="fs16 colorRed">￥{{item.actually}}</span></p>
          </div>
          <div class=" ptb10 borderB10 overflow">
              <button @click="payMoney(item.text)" :class="item.color?'colorRed bR5 bgw borderR mr15 btnOrder fr':'bR5 bgw mr15 btnOrder border666 fr'" v-for="(item,index) in btnArr" :key="index">{{item.text}}</button>
          </div>
          </div>
      </div>
      <ymalert ref="alert" :modal="alertText" />
      <ymDialog ref="dialog" :modal="modal" />
  </div>
</template>

<script>
import ymDialog from "../../common/dialog";
import ymalert from "../../common/alert";
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
      orderObj: [],
      orderList: [
        {
          order_id: "454545",
          status: 1,
          img: require("./goods.png"),
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
          img: require("./goods.png"),
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
          img: require("./goods.png"),
          name: "全生物降解垃圾袋家用塑料袋加厚中号绿色环保一次性袋厨房...",
          size: "M",
          color: "绿色",
          original: 30.0,
          num: 1,
          current: 20.0,
          actually: 11.0
        }
      ],
      modal: {
        confirmText: "已收货",
        contentText: "确认收货",
        cancelText:"未收货",
        red:false
      },
      alertText:{
          alertMsg:'请致电',
          service:true
      }
    };
  },
  components: {
    ymDialog,
    ymalert
  },
  methods: {
    changeNav(index) {
      this.selectedIndex =
        this.selectedIndex == index ? this.selectedIndex : index;
      this.changeStatus(this.selectedIndex);
    },
    changeStatus(selected) {
      this.navId = selected;
      this.showStatus =
        selected == 1 ? "等待付款" : selected == 2 ? "已发货" : "已完成";
      this.getOrderList();
    },
    payMoney(text) {
      if (text == "去付款") {
        // 跳转到确认订单页面
      } else if (text == "查看物流") {
        // 跳转到确认物流页面
        this.$router.push({
          name: "logistics",
          params: { title: "物流详情" }
        })
      } else if (text == "确认收货") {
        this.$refs.dialog
          .confirm()
          .then(() => {
            console.log('已收货');
          })
          .catch(() => {
            console.log('未收货');
          });
      } else if (text == "再次购买") {
        // 跳转到商品详情页面
      } else if (text == "去评价") {
        // 跳转到评价页面
      } else {
        // 售后
        this.$refs.alert.hand().then(()=>{
            }).catch(()=>{

            })
      }
    },
    getOrderList() {
      let _this = this;
      for (let i = 0; i < _this.orderList.length; i++) {
        if (this.selectedIndex == 0) {
          // 加载全部列表
        } else if (this.selectedIndex == 1) {
          // 待付款
          if (_this.orderList[i].status == 1) {
            _this.btnArr = [{ text: "去付款", color: true, event: "payMoney" }];
          }
        } else if (this.selectedIndex == 2) {
          //待收货

          if (_this.orderList[i].status == 2) {
            _this.btnArr = [
              { text: "查看物流", color: true, event: "logistics" },
              { text: "确认收货", color: false, event: "receipt" }
            ];
          }
        } else {
          // 已完成
          if (_this.orderList[i].status == 3) {
            _this.btnArr = [
              { text: "再次购买", color: false, event: "buyAgain" },
              { text: "去评价", color: true, event: "evaluate" },
              { text: "申请售后", color: false, event: "service" }
            ];
          }
        }
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
    this.getOrderList();
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
  .borderR{
    border: 1px solid #fb4e26;
  }
  .border666{
    border: 1px solid #666;
  }
}
</style>

