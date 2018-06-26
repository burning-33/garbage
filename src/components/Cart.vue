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
                <img :src="item.img" alt="" class="imgLi ">
                <div class="right ">
                  <div class="flex">
                    <h5>{{item.name}}</h5>
                    <span class="iconfont close" @click="close(index)">&#xe8e3;</span>
                  </div>
                  <h6>￥{{item.price}}</h6>
                  <div class="flex">
                    <p>{{item.author}}</p>
                    <div class="add">
                      <span @click="reduce(index)">-</span>
                      <span>{{item.count}}</span>
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
          <div class="priceAll">{{money}}</div>
          <div class="submitBtn" @click="submit">提交订单</div>
        </div>
      </div>
      <div v-else>
        <div class="none">
          <h3>购物车还没有东西</h3>
          <h5 @click="gohome">去逛逛？</h5>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Checkbox, CheckboxGroup } from 'vant';
  import { Button } from 'vant';
  import { Dialog } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Button);
  Vue.use(Checkbox).use(CheckboxGroup);
  export default {
    name: 'Cart',
    // components:{Cartpayment},
    data () {
      return {
        Cartshow: true,
        shows:'true',
        // editshow: true,
        isactive: true,
        addnum:'0',
        // checkedBook: [],
        result: ['a', 'b'],
        bookList:[
          {
            "img":"https://img.yzcdn.cn/2.jpg",
            "name": "JavaScript高级程序设计",
            "price": "9.9",
            "author": "购买数量",
            "describe": "《JavaScript高级程序设计(第3版)》是JavaScript超级畅销书的最新版。ECMAScript 5和HTML5在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript增添了很多适应未来发展的新特性。《JavaScript高级程序设计(第3版)》这一版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax与Comet服务器端通信，HTML5表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的开发实践。《JavaScript高级程序设计(第3版)》附录展望了未来的API和ECMAScript Harmony规范。",
            "pages":730,
            "number":'B00CBBJS5Y',
            "DateOfPublication":'2012年3月1日',
            "count": 1
          },
          {
            "img":"../../static/book-02.jpg",
            "name": "深入理解Java虚拟机：JVM高级特性与最佳实践（第2版）",
            "price": "9.9",
            "author": "Nicholas C. Zakas",
            "describe": "《JavaScript高级程序设计(第3版)》是JavaScript超级畅销书的最新版。ECMAScript 5和HTML5在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript增添了很多适应未来发展的新特性。《JavaScript高级程序设计(第3版)》这一版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax与Comet服务器端通信，HTML5表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的开发实践。《JavaScript高级程序设计(第3版)》附录展望了未来的API和ECMAScript Harmony规范。",
            "pages":730,
            "number":'B00CBBJS5Y',
            "DateOfPublication":'2012年3月1日',
            "count": 1
          },
          {
            "img":"../../static/book-03.jpg",
            "name": "JavaScript权威指南（第6版）",
            "price": "9.9",
            "author": "Nicholas C. Zakas",
            "describe": "《JavaScript高级程序设计(第3版)》是JavaScript超级畅销书的最新版。ECMAScript 5和HTML5在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript增添了很多适应未来发展的新特性。《JavaScript高级程序设计(第3版)》这一版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax与Comet服务器端通信，HTML5表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的开发实践。《JavaScript高级程序设计(第3版)》附录展望了未来的API和ECMAScript Harmony规范。",
            "pages":730,
            "number":'B00CBBJS5Y',
            "DateOfPublication":'2012年3月1日',
            "count": 1
          },
          {
            "img":"../../static/book-04.jpg",
            "name": "编写高质量代码：改善Java程序的151个建议",
            "price": "9.9",
            "author": "Nicholas C. Zakas",
            "describe": "《JavaScript高级程序设计(第3版)》是JavaScript超级畅销书的最新版。ECMAScript 5和HTML5在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript增添了很多适应未来发展的新特性。《JavaScript高级程序设计(第3版)》这一版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax与Comet服务器端通信，HTML5表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的开发实践。《JavaScript高级程序设计(第3版)》附录展望了未来的API和ECMAScript Harmony规范。",
            "pages":730,
            "number":'B00CBBJS5Y',
            "DateOfPublication":'2012年3月1日',
            "count": 1
          },

        ],
        checkItem: [],
        prices: 0,
        checked:[],//复选框
        totalSelection:false,//全选按钮
        arr:[1,2,3],
        money:'¥0',
        clickButton: '点击按钮',
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
        for(var i = 0; i< length;i++){
          this.checked[idx] = !this.checked[idx]
        }
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
        for(var i = 0; i< this.checked.length;i++){
          if(this.checked[i] == true){
            arrI.push(i)
          }
        }
        for(var a=0;a< arrI.length; a++){
          mon += Number(this.bookList[a].price)* this.bookList[a].count
        }
        this.money = '¥' + mon.toFixed(2);
      },
//    减号
      reduce(idx) {
        if(this.bookList[idx].count == 1){
          return
        }else {
          this.bookList[idx].count -= 1
        }
        //      计算总价
        this.totalPrice()
      },
//    加号
      plus(idx) {
        this.bookList[idx].count += 1;

//      计算总价
        this.totalPrice()
      },
//    选中删除
      close(idx) {
        Dialog.confirm({
          title: '删除该商品?',
          message: '',
          className:'detail'
        }).then(() => {
          this.bookList.splice(idx,1)
        }).catch(() => {
          return
        });

        //      计算总价
        this.totalPrice()
      },
      // 提交订单
      submit(){
        if(this.checked.indexOf(true) == -1){
          Toast('您还没有选中宝贝哦');
        }
      }
    },
    mounted(){
      this.checkde()
    },
    gohome() {
      window.ContentList.location.href = './Home.vue';
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*@import "../styles/cart.less";*/
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
    margin: 0 auto;
    text-align: center;
    h5{
      color: #00ca00;
      position: absolute;
      right: 10px;
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
