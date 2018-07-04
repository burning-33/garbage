<template>
  <div class="ordersure">
    <div class="detailsHeader">
      <div @click="$emit('orderfalse')" > <span class="iconfont">&#xe614;</span>返回 </div>
      <div class="title">确认订单</div>
      <div>...</div>
    </div>
    <div v-if="orderShow">
      <div class="top" @click="goAdrees">
        <div class="iconfont adressicon">&#xe61a;</div>
        <div class="collectGoods" >
          <div class="shouhuoBox">
            <div class="h1">收货人：{{adress.address.name}}</div>
            <div class="call">
              <span class="iconfont callicon">&#xe633;</span>
              <span>{{adress.address.phone}}</span>
            </div>
          </div>
          <span class="adress">收货地址:{{adress.address.content}}
            </span >
        </div>
        <div class="you iconfont">&#xe60d;</div>
      </div>
    </div>
    <div v-else>
      <div class="top" @click="goAdrees">
        <div class="iconfont adressicon">&#xe61a;</div>
        <div class="collectGoods">
          <div class="shouhuoBox">
            <div class="h1">收货人：</div>
            <div class="call">
              <span class="iconfont callicon">&#xe633;</span>
              <span></span>
            </div>
          </div>
          <span class="address">收货地址:
            </span >
        </div>
        <div class="you iconfont">&#xe60d;</div>
      </div>
    </div>
      <div class="details">
      <span>
        订单详情
      </span>
      </div>
      <div>
        <div class="listBox" v-for="(item,index) in adress.goods" :key="index">
          <img :src="item.cover" alt="" class="pic">
          <div class="youBox">
            <div class="h2">{{item.name}}</div>
            <div class="price">
              <div>￥{{item.price}}</div>
              <div>X{{item.num}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="total">合计数量：{{adress.num}}</div>

    <div class="moneyBox">
      <div class="section">
          <div>应付金额：</div>
          <div>￥{{adress.all_money}}</div>
        </div>
        <div class="section">
          <div>运费金额：</div>
          <div>￥{{adress.freight}}</div>
        </div>
        <div class="section">
          <div>优惠金额：</div>
          <div class="discount">￥{{adress.discount_money}}</div>
        </div>
      </div>
      <div class="sumBox">
        <div class="sum">应付总金额  ￥{{adress.all_money}}</div>
        <div class="yes" @click="payment">确定</div>
      </div>
      <van-popup v-model="show" >
        <div class="showBox">
          <div class="iconfont close" @click="close">&#xe609;</div>
          <div class="h1">选择支付方式</div>
          <div class="zhifubox">
            <div class="box" @click="zhifubaoBtn">
              <div class="iconfont zhifubao">&#xe629;</div>
              <div>支付宝</div>
            </div>
            <div class="box">
              <div class="iconfont weixin">&#xe659;</div>
              <div>微信</div>
            </div>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="showzhifubao">
        <div class="showBox">
          <div class="iconfont close close1" @click="closezhifubao">&#xe609;</div>
          <div class="h2">请复制以下链接，用浏览器打开</div>
          <div class="lianjie">{{link}}</div>
          <div class="btnBox">
            <div class="cancel" @click="cancel">取消</div>
            <div class="copy"   :data-clipboard-text="link"  @click="copy">复制</div>
          </div>
        </div>
    </van-popup>
        <van-popup v-model="showsucce">
          <div >
          <div class="showBox">
          <div class="h1">链接已复制</div>
          <div class="ok" @click="ok">OK</div>
          </div>
        </div>
        </van-popup>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Popup } from 'vant';
  import Clipboard from 'clipboard';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  Vue.use(Popup);
  export default {
    name: 'Ordersure',
    props:['chanpin'],
     components:{
    },
    data() {
      return {
        show:false,
        showzhifubao:false,
        link:'fgggggggggggggggggggggggggggggggggggggeawrtgraeeeeetgr',
        showsucce:false,
        list:[],//传输过来的产品数据
        obj:{},//传输过来的产品数据
        adress:'',
        orderShow:false,
        totalNum:''//合计数量
      }
    },
    computed: {
    },
    methods: {
      payment(){
        if(this.orderShow == false){
          Toast('请设置地址');
        }else {
          console.log('000')
          this.show = true
        }
      },
      close(){
        this.show = false
      },
      zhifubaoBtn(){
        this.show = false
        this.showzhifubao = true
      },
      closezhifubao(){
        this.showzhifubao = false
      },
      cancel(){
        this.showzhifubao = false
      },
      //复制
      copy() {
        var that = this;
        var clipboard = new Clipboard('.copy')
        clipboard.on('success', e => {
          console.log('复制成功')
          clipboard.destroy()
           that.showsucce = true
            that.showzhifubao = false
        })
        clipboard.on('error', e => {
          console.log('该浏览器不支持自动复制')
          clipboard.destroy()
        })
      },
      ok(){
        this.showsucce = false
      },
      // 设置地址页面
      goAdrees(){
        console.log('0000')
        this.$router.push('./Me/addressList')
      }
    },
    mounted(){
      const goods = JSON.stringify(this.chanpin);
      const selt = this;
      const  token = sessionStorage.getItem("token");
      selt.$fetch(selt.GLOBAL.base_url + 'order_info',{token:token,goods:goods})
        .then((response) => {
          console.log(response)
          if(response.code == '404'){
            Toast('请设置地址');
            return
          }
            selt.orderShow = true
            selt.adress= response.data;
          var nums = 0
          for(var i =0;i<response.data.goods;i++){
            nums= Number(response.data.goods[i].num) + nums
            console.log('000000000000')
          }
          console.log(nums)
            selt.totalNum = nums
        })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .ordersure{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #fafffb;
    overflow-y: auto;
    .van-button__text{
      color: #999999;
    }
  }
  .van-popup{
    border-radius: 10px;
  }
  .slide-fade-enter-active {
    transition: all .6s ease;
    transform: translateX(0);
  }
  .slide-fade-leave-active {
    transition: all .6s linear;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }
  .ordersure{
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
    .top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 10px 20px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #dcdcdc;
      .adressicon{
        font-size: 25px;
        color: #000000;
        margin: 10px;
      }
      .h1{
        font-size: 14px;
        color: #000000;
      }
      .shouhuoBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        .h1{
          width: 50%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .callicon{
          color: #fb4e26;
        }
      }
      .collectGoods{
        width: 78%;
        overflow: hidden;
      }
      .address{
        width: 100%;
        font-size: 14px;
        word-wrap: break-word;
        word-break: normal;
      }
    }
    .details{
      width: 100%;
      border-bottom: 1px solid #dcdcdc;
      color: #73ab1d;
      span{
        display: inline-block;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #73ab1d;
        color: #73ab1d;
        padding: 0 10px;
      }
    }
    .listBox{
      width: 100%;
      height: 100px;
      padding: 10px;
      border-bottom: 1px solid #dcdcdc;
      display: flex;
      align-items: center;
      .pic{
        width: 40%;
        height: 100%;
        border: 1px solid #dcdcdc;
        margin-right: 6px;
      }
      .price{
        display: flex;
        justify-content: space-between;
        color: #999999;
        font-size: 12px;
      }
      .youBox{
        height: 100%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        /*align-content:space-between ;*/

      }
    }
    .total{
      width: 100%;
      padding: 10px;
      text-align: right;
      font-size: 16px;
      color: #000000;
    }
    .moneyBox{
      width: 100%;
      padding: 20px 10px;
      background:#f2f2f2;
      border-top:1px solid #d1d1d1;
      .section{
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        font-size: 14px;
        .discount{
          color: #ff4f1f;
        }
      }
    }
    .sumBox{
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;

      .sum{
        width: 70%;
        height: 100%;
        background: #59a403;
        font-size: 16px;
        text-align: center;
        color: #ffffff;
      }
      .yes{
        width: 30%;
        height: 100%;
        background:#df1c24;
        font-size: 16px;
        text-align: center;
        color: #ffffff;
      }
    }

    .showBox{
      width: 300px;
      height: 200px;
      background: #ffffff;
      border-radius: 10px;
      position: relative;
      box-sizing: border-box;
      .ok{
        text-align: center;
        font-size: 16px;
        background: #59a403;
        border-radius: 4px;
        color: #ffffff;
        width: 80px;
        height: 25px;
        line-height: 25px;
        margin: 40px auto;
      }
      .close{
        position: absolute;
        top: -68px;
        right: 4px;
        color: #df1c24;
        font-size: 30px;
      }
      .close1{
        top: -44px;
      }
      .h1{
        text-align: center;
        font-size: 22px;
        margin: 70px 10px 10px 10px;
        color: #000000;
      }
      .h2{
        text-align: center;
        font-size: 18px;
        margin: 40px 10px 10px 10px;
        color: #000000;
      }
      .zhifubox{
        display: flex;
        justify-content: space-around;
      }
      .box{
        width: 40%;
        text-align: center;
        div{
          width: 100%;
          text-align: center;
          font-size: 22px;
          color: #000000;
        }
        .zhifubao{
          width: 100%;
          margin: 0 auto;
          color: #15a9ef;
          font-size: 80px;
          text-align: center;
        }
        .weixin{
          color: #07c712;
          font-size: 80px;
          text-align: center;
        }
      }
      .lianjie{
        width: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        word-wrap: break-word;
        word-break: normal;
        border: 0;
      }
      .btnBox{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        .cancel{
          padding: 4px 20px;
          background: #bbbbbb;
          color: #ffffff;
          border-radius: 4px;
          font-size: 16px;
        }
        .copy{
          padding: 4px 20px;
          background: #79b020;
          color: #ffffff;
          border-radius: 4px;
          font-size: 16px;
        }
      }
    }
  }

</style>

