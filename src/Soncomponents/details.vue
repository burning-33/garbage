<template>
  <div class="details">
    <div class="detailsHeader">
      <!-- <div @click="$emit('detafalse')" > <span class="iconfont">&#xe614;</span>返回 </div> -->
       <div @click="goHome" > <span class="iconfont">&#xe614;</span>返回 </div>
      <div class="title">商品详情</div>
      <div>...</div>
    </div>
    <div class="banner">
      <van-swipe >
        <van-swipe-item v-if="list.goods.imglist" v-for="(image, index) in list.goods.imglist" :key="index">
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
    <div v-if="list.comment">
         <div class="commentAll" >
          <span class="lvse">商品评论（{{list.comment.all_count}}）</span>
          <span @click="goComment">更多评论 ></span>
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
    </div>
    <div v-if="!list.comment">
        <div class="commentAll" >
          <span class="lvse">商品评论（0）</span>
        </div>
    </div>
    <div class="xiangqing">商品详情</div>
    <div class="productImg" v-html="list.goods.content">
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
          <img :src="list.goods.cover" alt="" class="img">
          <div class="rightBox">
            <div class="describe">{{list.goods.name}}</div>
            <div class="danjia">
              <!--<span>数量：1</span>-->
              <span>单价：￥{{unitPrice}}</span>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="h2">颜色分类</div>
          <div class="fenleiBox">
              <span @click="fenleiBtn(index)" v-for="(item,index) in yansefenlei" :key="index" class="fenlei" :class="[isActive == index? 'isActive':'']">{{item.name}}</span>
          </div>
        </div>
        <div class="section">
          <div class="h2">规格分类</div>
          <div class="fenleiBox">
            <span @click="fenleipreBtn(index)" v-for="(item,index) in fenlei" :key="index"  class="fenlei fenleipri" :class="[isActiveprive == index? 'isActive':'']">{{item}}</span>
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
        <div class="sure" @click="goOrder">确定</div>
      </div>
    </van-popup>
    <!--购物车-->
    <div class="cartMark" v-if="cartMark">
      <van-popup v-model="show1" position="bottom" :overlay="false" class="cartBox">
        <div class="mark">
        <div class="topBox">
          <img :src="list.goods.cover" alt="" class="img">
          <div class="rightBox">
            <div class="describe">{{list.goods.name}}</div>
            <div class="danjia">
              <!--<span>数量：1</span>-->
              <span>单价：￥{{unitPrice}}</span>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="h2">颜色分类</div>
          <div class="fenleiBox">
              <span @click="fenleiBtn(index)" v-for="(item,index) in yansefenlei" :key="index" class="fenlei" :class="[isActive == index? 'isActive':'']">{{item.name}}</span>
          </div>
        </div>
        <div class="section">
          <div class="h2">规格分类</div>
          <div class="fenleiBox">
            <span @click="fenleipreBtn(index)" v-for="(item,index) in fenlei" :key="index"  class="fenlei fenleipri" :class="[isActiveprive == index? 'isActive':'']">{{item}}</span>
          </div>
        </div>
        <div class="section yunsuan">
          <div class="h2">购买数量</div>
          <div class="add">
            <span @click="reduce()" class="iconfont">&#xe643;</span>
            <span>{{num}}</span>
            <span @click="plus()" class="iconfont">&#xe603;</span>
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
      </div>
      <div class="btnBox">
          <div class="cancel" @click="cancels">取消</div>
          <div class="sure" @click="sure">确定</div>
        </div>
      </van-popup>
    </div>
    <transition name="slide-fade">
      <Ordersure
        v-if="ordershow"
        @orderfalse = 'orderfalse'
        :chanpin = 'chanpin'
      />
    </transition>
    <!--评论-->
    <transition name="slide-fade">
      <Comment
        v-if="commentShow"
        @commentfalse = 'commentfalse'
        :idNum="idNum"
        :comment = "comment"
      />
    </transition>
  </div>
</template>

<script>
  import Comment from '../Soncomponents/Comment'
  import Ordersure from '../Soncomponents/Ordersure'
  // import Global from '../components/Global'
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
    components:{
      Ordersure,
      Comment
    },
    data() {
      return {
        list:'',
        imglist:'',//banner
        zanactive:false,//未点赞
        show: false,//购买弹出框
        show1: false,//加入购物车弹出框
        fenlei:'',
        yansefenlei:'',
        chanpinid:'',//默认第一个颜色的id
        isActive:'',//分类没有点击的状态
        isActiveprive:'',
        num:1, // 数量
        unitPrice:'',//单价
        payment:'￥0.00',//实际付款
        discount:'0',//优惠价格
        cartMark:false,
        heji:'',//加入购物车合计
        ordershow:false,//购买订单详情
        commentShow:false,//评论列表
        idNum:'',//评论列表id
        chanpin:[], //产品详情传入确认订单
      }
    },
    mounted: function(){
      console.log(this.$route.query.id)
      var ids = this.$route.query.id
      const selt = this;
      if(!selt.GLOBAL.discount){
        selt.GLOBAL.discount = 0
      }
      this.discount = selt.GLOBAL.discount
      console.log(selt.detailsid)
      selt.$fetch(selt.GLOBAL.base_url + 'goods/' + ids)
        .then((response) => {
          console.log(response.data)
          selt.list= response.data;
          //规格分类
          var arr=[];
          for(var i =0;i < response.data.format.length;i++){
            arr.push(response.data.format[i].name)
          }
          selt.fenlei = arr;
          selt.yansefenlei = response.data.format[0].color;
          //默认id
          selt.chanpinid = response.data.format[0].color[0].id
          // 单价默认值
          selt.unitPrice = response.data.format[0].color[0].price;
          selt.heji = response.data.format[0].color[0].price;
          selt.comment = response.data.comment.all_count
         
          this.paymentMoney()
      
          // 判断是否点赞
          if(response.data.comment.star == 0){
            selt.zanactive = false
          }else {
            selt.zanactive = true
          }
        })
    },
    computed: {
      allPrice:function(){
        return (this.unitPrice * this.num).toFixed(2)
      }
    },

    methods: {
        goHome(){
          this.$router.push({path: '/'})
      },
      obj(){

      },
      // 加入购物车
      addCart(){
        this.cartMark = true
        this.show1 = true
      },
      zan(){
        this.zanactive = !this.zanactive;

        if(this.zanactive == true){
          this.list.comment.num +=1
        }else if(this.zanactive == false){
          this.list.comment.num -=1
        }
    
      },
      shopping(){
        this.show = true
      },
      // 颜色分类选择
      fenleiBtn(index){
        this.isActive = index;
        //单价
        this.unitPrice = this.yansefenlei[index].price;
        //      计算总价
        this.paymentMoney()
        this.chanpinid = this.yansefenlei[index].id
      },
      // 规格分类选择
      fenleipreBtn(index){
        this.isActiveprive= index
        this.yansefenlei = this.list.format[index].color
        this.isActive = 0;
        //单价
        this.unitPrice = this.yansefenlei[0].price;
        //      计算总价
        this.paymentMoney()
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
        this.payment = (this.allPrice - this.discount).toFixed(2)
        console.log(this.allPrice)
        console.log(this.allPrice- this.discoun)
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
        this.heji = (this.unitPrice * this.num).toFixed(2);
      },
//    加号
      plus() {
        this.num += 1;
        this.heji = (this.unitPrice * this.num).toFixed(2);
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
        const  token = sessionStorage.getItem("token");
        if(!token){
          Toast('请登录');
        }else {
        this.show1 = false;
        this.cartMark = false;
        // Toast('加入购物车成功');
        const selt = this;
        var num = selt.num;
        var id = selt.chanpinid;
          selt.$post(selt.GLOBAL.base_url + "cart", {token: token,a_id: id,num:num})
            .then(res => {
              console.log(res);
              Toast(res.msg)
              if(res.code == '200'){
                this.show1 = false
                this.cartMark = false
              }
              // Toast('加入购物车成功');
            })
        }
      },
      orderfalse(){
        this.ordershow = false
      },
      commentfalse(){
        this.commentShow = false
      },
      //去订单详情
      goOrder(){
        this.show = false
        this.ordershow = true;
        this.chanpin = [];
        var objs = {};
        objs.a_id=this.chanpinid;
        objs.num =this.num
        this.chanpin.push(objs)
        console.log(this.chanpin)
      },
      // 去评论列表
      goComment(){
        this.idNum = this.list.goods.id
        this.show = false
        this.commentShow = true
      }
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .van-popup{
    border-radius: 20px 20px 0 0;
  }
  img{
    width: 100%;
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
        .add{
          span{
            font-size: 18px;
            margin-right: 10px;
          }
        }
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
  /*.add{*/
    /*span{*/
      /*display: inline-block;*/
      /*width: 30px;*/
      /*height: 25px;*/
      /*border: 1px solid #c0c0c0;*/
      /*padding:0;*/
      /*margin: 0;*/
      /*line-height: 25px;*/
      /*text-align: center;*/
      /*font-size: 18px;*/
    /*}*/
  /*}*/
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
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
    margin-top: 50px;
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
    box-sizing: border-box;
    overflow-x: hidden;
    .imgfu{
      width: 50px !important
    }
    img{
      width: 100% !important
    }
  }
  .van-dialog__content .van-dialog__message{
    text-align: center;
  }
</style>

