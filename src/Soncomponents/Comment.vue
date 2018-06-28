<template>
  <div class="comment">
    <div class="detailsHeader">
      <div @click="$emit('commentfalse')" > <span class="iconfont">&#xe614;</span>返回 </div>
      <div class="title">商品评价</div>
      <div>...</div>
    </div>
    <div class="box">
      <lazy-component>
      <div class="commentWrapper" v-for="(item,index) in list" :key="index" v-lazy="item">
        <div class="commentItem">
          <div class="headBox">
            <img :src="item.head" alt="" class="head">
            <span>{{item.nickname}}</span>
          </div>
          <div>
            <span>({{item.num}})</span>
            <span class="iconfont zan" :class="[item.status == '1' ? 'zanactive':'']" @click="zan(index)">&#xe677;</span>
          </div>

        </div>
        <div>{{item.content}}</div>
        <div class="time">{{item.create_time}}</div>
      </div>
      </lazy-component>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Popup } from 'vant';
  import { Lazyload } from 'vant';
  Vue.use(Lazyload);
  Vue.use(Popup);
  export default {
    name: 'Comment',
    props:['idNum'],
    data() {
      return {
        list:[],//传输过来的产品数据
        zanactive:false,//未点赞
        arr:[{a:'1'},{b:'2'}]
      }
    },
    computed: {

    },
    methods: {
      zan(index){

        if(this.list[index].status == '0'){
          console.log('0000')
          this.list[index].num +=1
          this.list[index].status = '1'
        }else if(this.list[index].status == '1'){
          console.log('1111')
          if(this.list[index].num > 0){
            this.list[index].num -=1
            this.list[index].status = '0'
            console.log(this.list)
          }
        }
      },
    },
    mounted(){
      const selt = this;
      const id = selt.idNum;
      console.log(id)
      selt.$fetch(selt.GLOBAL.base_url + 'comment',{g_id:selt.idNum})
        .then((response) => {
          console.log(response)
          selt.list = response.data
          // if(response.data.star == 0){
          //   selt.zanactive = false
          // }else {
          //   selt.zanactive = true
          // }
        })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
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
  .box{
    width: 100%;
    overflow-y: auto;
    margin-top: 50px;
  }
  .comment{
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
    margin: 10px 0;
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

</style>

