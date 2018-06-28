<template>
  <div class="CartBox">
    <div class="cart" v-if="Cartshow">
      <div v-if="shows">
        <div class="ulBox">
          <ul>
            <li v-for="(item, index) in bookList" :key="index">
              <div  @click="runCheckItem(index)">
                <van-checkbox v-model="checked[index]" ></van-checkbox>
              </div>
              <img :src="item.image" alt="" class="imgLi ">
              <div class="right ">
                <div class="flex">
                  <h5>{{item.name}}</h5>
                  <span class="iconfont close" @click="close(index)">&#xe8e3;</span>
                </div>
                <h6>￥{{item.money}}</h6>
                <div class="flex">
                  <p>购买数量</p>
                  <div class="add">
                    <span @click="reduce(index)">-</span>
                    <span>{{item.num}}</span>
                    <span @click="plus(index)">+</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottomBox">
          <div  @click="totalSelectionf" class="quanxuan">
            <van-checkbox v-model="totalSelection" >全选</van-checkbox>
          </div>
          <div>合计：</div>
          <div class="priceAll">{{allmoney}}</div>
          <div class="submitBtn" @click="submit">提交订单</div>
        </div>
      </div>
      <div v-else>
        <div class="none">
          <h3>购物车还没有东西</h3>
          <!--<h5 @click="gohome">？</h5>-->
          <router-link tag="h5" :to="{name: 'home',params:{title:'首页'}}">
            去逛逛?
          </router-link>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <Ordersure
        v-if="ordershow"
        @orderfalse = 'orderfalse'
        :chanpin = 'chanpin'
      />
    </transition>
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Checkbox, CheckboxGroup } from 'vant';
  import { Button } from 'vant';
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  import Ordersure from '../Soncomponents/Ordersure'
  Vue.use(Button);
  Vue.use(Checkbox).use(CheckboxGroup);
  export default {
    name: 'Cart',
    components:{
      Ordersure,
    },
    data () {
      return {
        Cartshow: true,
        shows:'true',
        isactive: true,
        addnum:'0',
        result: ['a', 'b'],
        bookList:[],
        checkItem: [],
        prices: 0,
        checked:[],//复选框
        totalSelection:false,//全选按钮
        arr:[1,2,3],
        allmoney:'¥0.00',
        clickButton: '点击按钮',
        ordershow:false,
        chanpin:[], //产品详情传入确认订单
      }
    },
    computed: {
      show: function () {
        if(this.checkItem.length > 0){
          this.shows = true
        }else {
          this.shows = false
        }
      },
    },
    methods: {
      checkde:function () {
        var length = this.bookList.length
        for(var i = 0;i <length; i++ ){
          this.checked.push(false)
        }
        console.log(this.checked)
      },
      // 全选
      totalSelectionf:function () {
        var length = this.bookList.length;

        if(this.totalSelection == true){
          for(var i = 0;i <length; i++ ){
            this.checked[i] = true
          }
        }else {
          for(var i = 0;i <length; i++ ){
            this.checked[i] = false
          }
        }
        this.totalPrice()
      },
      // 复选框选择事件
      runCheckItem(idx) {
        var length = this.checked.length;
        this.checked[idx] = !this.checked[idx];
        if(this.checked[idx] == true){
          this.checked.splice(idx,1,false)
        }else if(this.checked[idx] == false){
          this.checked.splice(idx,1,true)
        }
        console.log(this.checked);
        if(this.checked.indexOf(false) == -1){
          this.totalSelection = true
        }else {
          this.totalSelection = false
        }
        this.totalPrice()
      },
      // 计算总价
      totalPrice(){
        var arrI=[];
        var mon = 0;
        var arrlist = [];
        var str = ''
        for(var i = 0; i< this.checked.length;i++){
          if(this.checked[i] == true){
            arrI.push(i)
          }
        }
        for(var a=0;a< arrI.length; a++){
          mon += Number(this.bookList[arrI[a]].money)* this.bookList[arrI[a]].num;
          var obj={};
          obj.a_id = this.bookList[arrI[a]].id;
          obj.num = this.bookList[arrI[a]].num;
          console.log(obj)
          arrlist.push(obj)
        }
        this.chanpin =arrlist;
        this.allmoney = '¥' + mon.toFixed(2);
        console.log(arrlist)
      },
//    减号
      reduce(idx) {
        if(this.bookList[idx].num== 1){
          return
        }else {
          this.bookList[idx].num -= 1
          const selt = this;
          const id = selt.bookList[idx].id;
          const num = this.bookList[idx].num
          const token = sessionStorage.getItem("token");
          selt.$put(selt.GLOBAL.base_url + 'cart',{token:token, id: id,num:num})
            .then((response) => {
              console.log(response)
              if(response.code == 200){
                //      计算总价
                console.log('00')
                selt.totalPrice()
              }else {
                Toast('网络错误，稍后再试');
              }
            });
        }
      },
//    加号
      plus(idx) {
        this.bookList[idx].num += 1;
        const selt = this;
        const id = selt.bookList[idx].id;
        const num = this.bookList[idx].num
        const token = sessionStorage.getItem("token");
        console.log(id)
        selt.$put(selt.GLOBAL.base_url + 'cart',{token:token, id: id,num:num})
          .then((response) => {
            console.log(response)
            if(response.code == 200){
              //      计算总价
              console.log('00')
              selt.totalPrice()
            }else {
              Toast('网络错误，稍后再试');
            }
          });
      },
//    选中删除
      close(idx) {
        Dialog.confirm({
          title: '删除该商品?',
          message: '',
          className:'detail'
        }).then(() => {
          const selt = this;
          const id = selt.bookList[idx].id;
          const token = sessionStorage.getItem("token");
          console.log(token)
          selt.$det(selt.GLOBAL.base_url + 'cart',{data:{token: token, id: id}})
            .then((response) => {
              console.log(response)
              if(response.code == 200){
                selt.bookList.splice(idx,1);
                selt.checked.splice(idx,1);
                //      计算总价
                selt.totalPrice()
              }else {
                Toast('网络错误，稍后再试');
              }
            })
        }).catch(() => {
          return
        });

      },
      // 提交订单
      submit(){
        if(this.checked.indexOf(true) == -1){
          Toast('您还没有选中宝贝哦');
        }else {
          this.ordershow = true
        }
      },
      orderfalse(){
        this.ordershow = false;
        if(this.checked){
          this.checked = []
        }
        this.totalSelection = false
      },
      gohome() {
        window.ContentList.location.href = './Home.vue';
      }
    },
    mounted(){
      const selt = this;
      const token = sessionStorage.getItem("token");
      selt.$fetch(selt.GLOBAL.base_url + 'cart',{token: token})
        .then((response) => {
          console.log(response.data)
          if(response.data.length){
            selt.bookList = response.data
          }else {
            selt.shows = false
          }
          this.checkde()
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*@import "../styles/cart.less";*/
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
  #app {
    .detail{
      background: red;
    }

  }
  .bottomBox{
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding-left: 10px;
    background: white;
    position: fixed;
    bottom: 50px;
    left: 0;
    margin-top: 20px;
    color: #000000;
    font-size: 16px;
    .priceAll{
      color: red;
    }
    .van-button__text{
      color: white;
    }
    .submitBtn{
      height: 100%;
      width: 140px;
      font-size: 16px;
      position: absolute;
      right: 0;
      top: 0;
      background: #79b020;
      text-align: center;
      color: #ffffff;
    }
    .quanxuan{
      display: flex;
      align-items: center;
      .van-checkbox{
        padding-top: 0;
      }
    }
  }
  .imgLi{
    width: 20%;
    height: 80px;
    margin-right: 10px;
    background: #73ab1d;

  }
  .slide-right-enter-active {
    transition: all 1s ease;
    transform: translateX(0)
  }

  .slide-right-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%)
  }

  .slide-right-enter {
    transform: translateX(100%)
  }

  .slide-right-leave {
    transform: translateX(0)
  }
  .slide-right-enter-active {
    transition: all 1s ease;
    transform: translateX(0)
  }

  .slide-right-leave-active {
    transition: all 1s ease;
    transform: translateX(-100%)
  }

  .slide-right-enter {
    transition: all 1s ease;
    transform: translateX(100%)
  }

  .slide-right-leave {
    transition: all 1s ease;
    transform: translateX(0)
  }
  .flex{
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .van-checkbox{
    line-height: 150px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    box-sizing: border-box;
    margin-right: 10px;
    padding-top: 40px;
  }
  .ulBox{
    .van-checkbox__label{
      display: flex;
      width: 100%;
      height: 100%;
      background: red;
    }
  }
  .none{
    width: 100%;
    height: 50px;
    margin: 50px auto;
    text-align: center;
    h5{
      color: red;
      position: absolute;
      right: 10px;
      font-size: 16px;
    }
  }
  .close{
    color: red;

  }
  .img{
    width: 60px;
    height: 60px;
    background: #00ca00;
  }
  .CartBox{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    transition: all 2s ease;
    background: #efefef;
    box-sizing: border-box;
    color: #ffffff;
  }
  .cart{
    /*padding: 0 10px;*/
    font-size: 15px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    .gopayment{
      transition: all .8s ease;
    }

    header{
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: right;
      color: #2875e1;
      & span:last-child{
        color: #ff4929;
        margin-left: 20px;
      }
    }
    .ulBox {
      width: 100%;
      list-style: none;
      padding: 0;
      margin-bottom: 70px;
      ul{
        padding: 0;
        li {
          display: inline-block;
          height: 140px;
          width: 100%;
          padding: 10px;
          margin: 0 0 2px 0;
          text-align: center;
          background: #ffffff;
          display: flex;
          position: relative;
          overflow-x: hidden;
          margin: 10px 0;
          box-sizing: border-box;
          img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
            background: #73ab1d;
          }
          .idot{
            margin-right: 10px;
            display: flex;
            .active{
              background: #2875e1;
              border: 0;
            }
            input{
              display: inline-block;
              width: 15px;
              height: 15px;
              border: 1px solid #252525;
              border-radius: 15px;
              margin-top: 43px;
            }
          }
          .right{
            text-align: left;
            width: 100%;
            width: 80%;
            h5 {
              height: 40px;
              line-height: 20px;
              /*line-height: 14px;*/
              overflow: hidden;
              margin: 0;
            }
            h6 {
              color: #bfbfbf;
              font-size: 14px;
              margin: 0;
            }
            p{
              margin-top: 10px;
              color: #73ab1d;
            }
          }
          .add{
            position: absolute;
            bottom: 10px;
            right: 10px;
            padding: 0;
            span{
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 1px solid #c0c0c0;
              padding:0;
              margin: 0;
              line-height: 20px;
              text-align: center;
            }
          }
        }
      }
    }
    .btn{
      width: 100%;
      & p:first-child{
        text-align: left;
        color: #ff4f2f;
        font-size: 25px;
      }
      & p:last-child{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #1da43e;
        color: #ffffff;
        border-style: none;
        border-radius: 5px;
        font-size: 20px;
      }

    }
  }

</style>
