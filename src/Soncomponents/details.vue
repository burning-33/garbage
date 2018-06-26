<template>
  <div class="details">
    <div class="detailsHeader">
      <div @click="$emit('detafalse')" > <span class="iconfont">&#xe614;</span>返回 </div>
      <div class="title">商品详情</div>
      <div>...</div>
    </div>
    <div class="banner">
      <van-swipe >
        <van-swipe-item v-for="(image, index) in list.goods.imglist" :key="index">
          <img :src="image" alt="" class="bannerimg">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="name">
      {{list.goods.name}}
    </div>
    <div class="price">
      <span class="oldprice">￥{{list.goods.price}}</span>
      <span class="newprice">￥{{list.goods.money}}</span>
    </div>
    <div class="commentAll">
      <span class="lvse">商品评论（{{list.comment.all_count}}）</span>
      <span>更多评论 ></span>
    </div>
    <div class="commentWrapper">
      <div class="commentItem">
        <div class="headBox">
          <img :src="list.comment.member.head" alt="" class="head">
          <span>{{list.comment.member.nickname}}</span>
        </div>
        <div>
          <span>({{list.comment.num}})</span>
          <span class="iconfont zan" :class="{zanactive:zanactive}" @click="zan">&#xe677;</span>
        </div>

      </div>
      <div>{{list.comment.content}}</div>
      <div class="time">{{list.comment.create_time}}</div>
    </div>
    <div class="xiangqing">商品详情</div>
    <div class="productImg">
      <div class="" v-html="list.goods.content"></div>
      <!--<img src="" alt="">-->
    </div>
    <div class="buy">
      <div class="add" @click="addCart">
        <span class="iconfont">&#xe655;</span>
        <span>加入购物车</span>
      </div>
      <div class="buyNow" @click="shopping">
        <span class="iconfont">&#xe631;</span>
        <span>立即购买</span>
      </div>
    </div>
    <!--立即购买-->
    <van-popup v-model="show" position="bottom" :overlay="false">
      <div class="mark">
        <div class="iconfont close" @click="close">&#xe609;</div>
        <div class="topBox">
          <img src="https://img.yzcdn.cn/2.jpg" alt="" class="img">
          <div class="rightBox">
            <div class="describe">2121212121212121212121212166612459</div>
            <div class="danjia">
              <!--<span>数量：1</span>-->
              <span>单价：￥{{unitPrice}}</span>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="h2">颜色分类</div>
          <div class="fenleiBox">
              <span @click="fenleiBtn(index)" v-for="(item,index) in yansefenlei" class="fenlei" :class="[isActive == index? 'isActive':'']">{{item.name}}</span>
          </div>
        </div>
        <div class="section">
          <div class="h2">规格分类</div>
          <div class="fenleiBox">
            <span @click="fenleipreBtn(index)" v-for="(item,index) in fenlei" class="fenlei fenleipri" :class="[isActiveprive == index? 'isActive':'']">{{item}}</span>
          </div>
        </div>
        <div class="section yunsuan">
          <div class="h2">购买数量</div>
          <div class="add">
            <span @click="reduce()">-</span>
            <span>{{num}}</span>
            <span @click="plus()">+</span>
          </div>
        </div>
        <div class="section yunsuan">
          <div class="h2 textleft">
            <span>共{{num}}件商品 总价</span>
            <span class="prices">￥{{allPrice}}</span>
          </div>
        </div>
        <div class="section yunsuan">
          <div class="h2 youhuiBox">
            <span class="prices">优惠：￥{{discount}}</span>
            <div>
              <span>实付：</span>
              <span class="prices">{{payment}}</span>
            </div>
          </div>
        </div>
        <div class="sure">确定</div>
      </div>
    </van-popup>
    <!--购物车-->
    <div class="cartMark" v-if="cartMark">
      <van-popup v-model="show1" position="bottom" :overlay="false" class="cartBox">
        <div class="danjias">单价：￥{{unitPrice}}</div>
        <div class="section yunsuan shuliangBox">
          <div class="h2">购买数量</div>
          <div class="add">
            <span @click="reduce()">-</span>
            <span class="nums">{{num}}</span>
            <span @click="plus()">+</span>
          </div>
        </div>
        <div class="hejiBox">合计：<span class="heji">￥30.00</span></div>
        <div class="btnBox">
          <div class="cancel" @click="cancels">取消</div>
          <div class="sure" @click="sure">确定</div>
        </div>
      </van-popup>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'vant';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import { Popup } from 'vant';
  Vue.use(Popup);
  Vue.use(Swipe).use(SwipeItem);
  export default {
    name: 'Details',
    props:['imgid','detailsid'],
    data() {
      return {
        list:'',
        zanactive:false,//未点赞
        show: false,//购买弹出框
        show1: false,//加入购物车弹出框
        fenlei:'',
        yansefenlei:'',
        isActive:'',//分类没有点击的状态
        isActiveprive:'',
        num:1, // 数量
        unitPrice:'',//单价
        payment:'￥0.00',//实际付款
        discount:1,//优惠价格
        cartMark:false
      }
    },
    created: function(){
      this.obj()
    },
    computed: {
      allPrice:function(){
        return this.unitPrice * this.num
      }
    },

    methods: {
      obj(){
        const selt = this;
        console.log(selt.detailsid)
        axios.get('http://garbage.xxw360.com/api/goods/' + selt.detailsid).then(function (res) {
          console.log(res.data.data)
          selt.list= res.data.data;
          //规格分类
          var arr=[];
          for(var i =0;i < res.data.data.format.length;i++){
            arr.push(res.data.data.format[i].name)
          }
          selt.fenlei = arr;
          selt.yansefenlei = res.data.data.format[0].color;
          // 单价默认值
          selt.unitPrice = res.data.data.format[0].color[0].price;
          // 判断是否点赞
          if(res.data.data.star.commen == 0){
            selt.zanactive = false
          }else {
            selt.zanactive = true
          }
        }).catch(function (err) {
          console.error('请求错误')
        })
      },
      // 加入购物车
      addCart(){
        Toast('加入购物车成功');
        this.cartMark = true
        this.show1 = true
      },
      zan(){
        this.zanactive = !this.zanactive
      },
      shopping(){
        this.show = true
      },
      // 颜色分类选择
      fenleiBtn(index){
        console.log(index)
        this.isActive = index
        //单价
        this.unitPrice = this.yansefenlei[index].price;
        console.log(this.unitPrice)
        //      计算总价
        this.paymentMoney()
      },
      // 规格分类选择
      fenleipreBtn(index){
        this.isActiveprive= index
        this.yansefenlei = this.list.format[index].color
        console.log(this.yansefenlei)
      },
      //      计算总价
      totalPrice(){
          var mon = this.unitPrice * this.num;
          console.log(mon)
          // this.allPrice =  mon.toFixed(2)
      },
      //实际付款
      paymentMoney(){
        this.payment = this.allPrice - this.discount
      },
      //    减号
      reduce() {
        if(this.num == 1){
          return
        }else {
          this.num -= 1
        }
        //      计算总价
        this.paymentMoney()
      },
//    加号
      plus() {
        this.num += 1;
//      计算总价
        this.paymentMoney()
      },
      close(){
        this.show = false
      },
      // 购物车取消
      cancels(){
        this.show1 = false
        this.cartMark = false
      },
      sure(){
        this.show1 = false
        this.cartMark = false
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .van-popup{
    border-radius: 20px 20px 0 0;
  }
  .cartMark{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(73, 73, 73, 0.64);
    .cartBox{
      border-radius: 0;
      .danjias{
          padding: 10px;
        font-size: 16px;
        color: #000000;
      }
      .shuliangBox{
        display: flex;
        justify-content: center;
        padding: 10px 0;
        border-bottom: 1px solid #e8e8e8;
      }
      .h2{
        color: #73ab1d;
        font-size: 18px;
        margin-right: 14px;
      }
      .nums{
        color: red;
      }
      .hejiBox{
        width: 100%;
        font-size: 20px;
        padding: 10px;
        box-sizing: border-box;
        color: #000000;
        .heji{
          color: red;
          font-size: 20px;
        }
      }
      .btnBox{
        width: 100%;
        height: 40px;
        display: flex;
        div{
          width: 50%;
          height: 100%;
          text-align: center;
          font-size: 16px;
          color: #ffffff;
          line-height: 40px;
        }
        .cancel{
          background: #bbbbbb;
        }
        .sure{
          background: #df1c24;
        }
      }
    }
  }
  .add{
    span{
      display: inline-block;
      width: 30px;
      height: 25px;
      border: 1px solid #c0c0c0;
      padding:0;
      margin: 0;
      line-height: 25px;
      text-align: center;
      font-size: 18px;
    }
  }
  .mark{
    width: 100%;
    background: white;
    position: relative;
    border-radius: 20px;
    padding: 20px 10px;
    box-sizing: border-box;
    margin: 0;
    .add{
      display: flex;
      span{
        display: inline-block;
        width: 30px;
        height: 25px;
        border: 1px solid #c0c0c0;
        padding:0;
        margin: 0;
        line-height: 25px;
        text-align: center;
        font-size: 18px;
      }
    }
    .sure{
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #79b020;
      color: #ffffff;
      text-align: center;
      font-size: 18px;
      border-radius: 6px;
    }
    .section{
      padding: 0;
      border-bottom: 1px solid #e7e7e7;
      .prices{
        color: #ff1822;
        font-size: 18px;
      }
      .youhuiBox{
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .textleft{
        width: 100%;
        text-align: right;
      }
    }
    .yunsuan{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .fenleipri{
      text-align: center;

    }
    .flexs{
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      span{
        /*margin-right: 20px;*/
      }
    }
    .topBox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      overflow-x: hidden;
      padding: 20px 0;
      border-bottom: 1px solid #e7e7e7;
      .describe{
        width: 100%;
        line-height: 20px;
        height: 50px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      .rightBox{
        width: 65%;
        padding-top: 20px;
        padding-right: 10px;
        box-sizing: border-box;
        .danjia{
          width: 100%;
          text-align: right;
        }
      }
    }
    .close{
      position: absolute;
      right: 6px;
      top: 6px;
      font-size: 20px;
    }
    .img{
      width: 30%;
      height: 100px;
      margin-right: 10px;
    }
    .fenleiBox{
      width: 100%;
      line-height: 30px;
      .fenlei{
        padding: 4px 6px;
        background: #cfcfcf;
        border-radius: 4px;
        margin: 20px 0 ;
        margin-right: 20px;

      }
      .isActive{
        background: #79b020;
        color: white;
      }
    }
    .h2{
      line-height: 50px;
      color: #000000;
      font-size: 16px;
    }
  }
  .details{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #e9eeea;
    overflow-y: auto;
  }
.detailsHeader{
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  background: #73ab1d;
  box-sizing: border-box;
  font-size: 20px;
  position: relative;
  .iconfont{
    color: #ffffff;
  }
  div{
    color: #ffffff;
    font-size: 20px;
  }
  .title{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
  .banner{
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
    img{
      width: 100%;
      height: 200px;
    }
    .van-swipe__indicator--active{
      background-color: #2bbf3a;
    }
  }
  .name{
    width: 100%;
    background: white;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10px;
  }
  .price{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    background: white;
    .oldprice{
      text-decoration:line-through
    }
    .newprice{
      color: #ff452c;
    }
  }
  .commentAll{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-bottom: 1px solid #bdbdbd;
    background: white;
    .lvse{
      color: #73ab1d;
    }
  }
  .commentWrapper{
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    background: #ffffff;
    padding-bottom: 6px;
  }
  .commentItem{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .time{
    color: #dcdcdc;
    font-size: 10px;
    margin: 10px 0;
    /*border-bottom: 2px solid #d2d2d2;*/
  }
  .zan{
    color: #a8a8a8;
    font-size: 20px;
  }
  .zanactive{
    color: #ff4511;
  }
  .headBox{
    display: flex;
    align-items: center;
    span{
      color:#73ab1d;
    }
  }
  .head{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #73ab1d;
    margin-right: 10px;
  }
  .xiangqing{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #000000;
    font-size: 18px;
  }
  .buy{
    width: 100%;
    height: 50px;
    color: white;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    margin-top: 60px;
    .add{
      width: 50%;
      height: 100%;
      line-height:50px;
      background: #ff6d1a;
      text-align: center;
      span{
        color: #ffffff;
      }
      .iconfont{
        color: #ffffff;
      }
    }
    .buyNow{
      width: 50%;
      height: 100%;
      line-height: 50px;
      background: #ff1c17;
      text-align: center;
      span{
        color: #ffffff;
      }
      .iconfont{
        color: #ffffff;
      }
    }
  }
  .productImg{
    width: 100%;
    background: #ffffff;
    margin-bottom: 60px;
  }
  .van-dialog__content .van-dialog__message{
    text-align: center;
  }
</style>

